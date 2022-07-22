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
import { app } from 'app/main';
import MoveCommand from 'app/commands/MoveCommand';

export default class SelectorTool extends InputHandler {

  private __target?: DigitalElement;

  private __selectionBox?: SelectionBox<DigitalElement>;

  private __start: IPoint;
  private __mouse: IPoint;
  private __moverBox?: MoverBox<DigitalElement>;

  public init({ x, y }: IPoint): void {
    this.__start = { x, y };
    this.__mouse = { x, y };
    this.__moverBox = ENTITIES.find(MoverBox)(() => true);
    if (this.__moverBox) {
      return;
    }
    const target = getClosestTarget({ x, y });
    if (target instanceof DigitalElement) {
      this.__target = target;
      return;
    }
    this.__selectionBox = new SelectionBox({ x, y, SelectionType: DigitalElement });
  }

  public dispose(): void {
    this.__selectionBox?.$destroy();
    ENTITIES.find(MoverBox)(() => true)?.$destroy();
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
        dx: mouseEvent!.x - this.__mouse.x,
        dy: mouseEvent!.y - this.__mouse.y,
      };
      ENTITIES.forEvery(MoverBox)((moverBox) => {
        moverBox.moveBy({ dx, dy });
      });
    }
    const { x, y } = mouseEvent;
    this.__mouse = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    if (this.__target) {
      this.__target.$patch(PoseComponent, this.__start);
      app.controllers.command.invoke(new MoveCommand({ target: this.__target, destination: event }));
    }
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
    const moverBox = triggerMouseEventsOnClosestTarget({ event: mouseEvent });
    if (moverBox instanceof MoverBox) {
      const mouse = moverBox.$copy(MouseComponent);
      if (!mouse?.isHovered) {
        this.__moverBox?.$destroy();
        EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
        return;
      }
      this.__moverBox = moverBox;
    }
  }

  public [KEYBOARD_EVENT.KEY_UP](keyboardEvent: IKeyboardEvent): void {
    const moverBox = ENTITIES.find(MoverBox)(() => true) as MoverBox<DigitalElement>;
    if (!moverBox) {
      return;
    }
    if (keyboardEvent.key === 'c') {
      app.controllers.clipboard.copy(moverBox);
      return;
    }
  }

}