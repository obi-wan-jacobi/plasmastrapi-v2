import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import MoverBox from './MoverBox';
import SelectionBox from './SelectionBox';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { IPoint } from 'foundation/geometry/components/PoseComponent';

export default class SelectorTool extends InputHandler {

  private __selectionBox: SelectionBox<DigitalElement>;

  public init({ x, y }: IPoint): void {
    this.__selectionBox = new SelectionBox({ x, y, SelectionType: DigitalElement });
  }

  public dispose(): void {
    this.__selectionBox.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__selectionBox.stretchTo(mouseEvent);
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    if (this.__selectionBox.items.size > 0) {
      new MoverBox(this.__selectionBox);
    }
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

}