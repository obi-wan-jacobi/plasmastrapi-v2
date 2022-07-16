import Gate from 'digital-logic/abstracts/Gate';
import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { triggerMouseEventsOnClosestTarget } from './DefaultTool';
import MoverBox from './MoverBox';
import SelectionBox from './SelectionBox';
import { ENTITIES } from 'engine/concretes/EntityMaster';

export default class SelectorTool extends InputHandler {

  private __target?: Gate;

  private __selectionBox?: SelectionBox<Gate>;

  private __start: IPoint;
  private __moverBox?: MoverBox<Gate>;

  public init({ x, y }: IPoint): void {
    this.__selectionBox = new SelectionBox({ x, y, SelectionType: Gate });
    this.__target = this.__selectionBox.selections.values().next().value;
    if (this.__target) {
      this.__selectionBox.$destroy();
      this.__selectionBox = undefined;
      return;
    }
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
      const { x, y } = mouseEvent!;
      this.__start = { x, y };
    }
    const { x, y } = mouseEvent;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    if (this.__selectionBox && this.__selectionBox.selections.size > 0) {
      new MoverBox({ selectionBox: this.__selectionBox });
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

}