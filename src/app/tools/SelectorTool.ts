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

export default class SelectorTool extends InputHandler {

  private __target?: Gate;
  private __selectionBox?: SelectionBox<Gate>;
  private __moverBox?: MoverBox<Gate>;

  public init({ x, y }: IPoint): void {
    this.__selectionBox = new SelectionBox({ x, y, SelectionType: Gate });
    this.__target = this.__selectionBox.selections.size ? this.__selectionBox.selections.values().next().value : undefined;
    if (this.__target) {
      this.__selectionBox.$destroy();
      this.__selectionBox = undefined;
      return;
    }
  }

  public dispose(): void {
    this.__selectionBox?.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    if (this.__selectionBox) {
      this.__selectionBox.stretchTo(mouseEvent);
      return;
    }
    if (this.__target) {
      this.__target.$patch(PoseComponent, { x: mouseEvent.x, y: mouseEvent.y });
    }
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
  if (!this.__target && this.__selectionBox && this.__selectionBox.selections.size > 0) {
      this.__selectionBox.$destroy();
      this.__moverBox = new MoverBox({ selectionBox: this.__selectionBox });
      this.__selectionBox = undefined;
      return;
    }
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    triggerMouseEventsOnClosestTarget({ event: mouseEvent });
    const mouse = this.__moverBox?.$copy(MouseComponent);
    if (!mouse?.isHovered) {
      this.__moverBox?.$destroy();
      EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
      return;
    }
  }

}