import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { getClosestTarget, triggerMouseEventsOnClosestTarget } from './DefaultTool';
import MoverBox from './MoverBox';
import SelectionBox from './SelectionBox';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { KEYBOARD_EVENT } from 'html5-canvas/enums/KEYBOARD_EVENT';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import { Dict } from 'base/types';
import Wire from 'digital-logic/wires/Wire';
import Terminal from 'digital-logic/abstracts/Terminal';

export default class SelectorTool extends InputHandler {

  private __target?: DigitalElement;

  private __selectionBox?: SelectionBox<DigitalElement>;

  private __start: IPoint;
  private __moverBox?: MoverBox<DigitalElement>;

  public init({ x, y }: IPoint): void {
    const target = getClosestTarget({ x, y });
    if (target instanceof DigitalElement) {
      this.__target = target;
      return;
    }
    this.__selectionBox = new SelectionBox({ x, y, SelectionType: DigitalElement });
  }

  public dispose(): void {
    this.__selectionBox?.$destroy();
    ENTITIES.forEvery(MoverBox)((moverbox) => moverbox.$destroy());
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    if (this.__target) {
      this.__target.$patch(PoseComponent, { x: mouseEvent.x, y: mouseEvent.y });
    }
    else if (this.__selectionBox) {
      this.__selectionBox.stretchTo(mouseEvent);
    }
    else if (this.__moverBox) {
      const { dx, dy } = {
        dx: mouseEvent!.x - this.__start.x,
        dy: mouseEvent!.y - this.__start.y,
      };
      ENTITIES.forEvery(MoverBox)((moverBox) => {
        moverBox.moveBy({ dx, dy });
      });
    }
    const { x, y } = mouseEvent;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    if (this.__selectionBox && this.__selectionBox.items.size > 0) {
      new MoverBox(this.__selectionBox);
      this.__selectionBox.$destroy();
      this.__selectionBox = undefined;
      return;
    }
    if (event.isShiftDown) {
      this.__moverBox = undefined;
      return;
    }
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    const target = triggerMouseEventsOnClosestTarget({ event: mouseEvent });
    if (target instanceof MoverBox) {
      const mouse = target.$copy(MouseComponent);
      if (!mouse?.isHovered) {
        this.__moverBox?.$destroy();
        EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
        return;
      }
      this.__moverBox = target;
    }
  }

  public [KEYBOARD_EVENT.KEY_UP](keyboardEvent: IKeyboardEvent): void {
    const moverBox = ENTITIES.find(MoverBox)(() => true) as MoverBox<DigitalElement>;
    if (!moverBox) {
      return;
    }
    if (keyboardEvent.key === 'c') {
      moverBox.$destroy();
      const pose = moverBox.$copy(PoseComponent)!;
      this.__moverBox = new MoverBox<DigitalElement>(moverBox);
      this.__moverBox.items = new Set();
      const ioMap: Dict<Terminal> = {};
      for (const item of moverBox.items) {
        const newElement = new (item as any).constructor(item.$copy(PoseComponent)) as DigitalElement;
        const newChildren = newElement.$children.toArray();
        const existingChildren = item.$children.toArray();
        for (let i = 0; i < existingChildren.length; i++) {
          if (existingChildren[i] instanceof Terminal) {
            ioMap[existingChildren[i].$id] = newChildren[i] as Terminal;
          }
        }
        this.__moverBox.items.add(newElement);
      }
      const wires = [...moverBox.items].reduce((result, element) => {
        return result.concat(element.$children.filter((child) => child instanceof Wire) as []);
      }, []).filter((wire, index, self) => self.indexOf(wire) === index) as Wire[];
      for (const wire of wires) {
        new Wire({
          input: ioMap[wire.input.$id] || wire.input,
          output: ioMap[wire.output.$id] || wire.output,
        });
      }
      this.__moverBox.moveBy({
        dx: this.__start.x - pose.x,
        dy: this.__start.y - pose.y,
      });
    }
  }

}