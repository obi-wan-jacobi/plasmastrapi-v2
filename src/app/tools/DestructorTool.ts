import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import SelectionBox from './SelectionBox';
import { KEYBOARD_EVENT } from 'html5-canvas/enums/KEYBOARD_EVENT';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import InputHandler from 'app/abstracts/InputHandler';
import Gate from 'app/abstracts/Gate';
import EVENT_BUS from 'app/EVENT_BUS';

export default class DestructorTool extends InputHandler {

  private __selectionBox: SelectionBox<Gate>;

  public dispose(): void {
    this.__selectionBox?.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__selectionBox?.stretchTo(mouseEvent!);
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    this.__selectionBox = new SelectionBox({ x: mouseEvent!.x, y: mouseEvent!.y, SelectionType: Gate });
    this.__selectionBox.$patch(StyleComponent)({ colour: 'RED' });
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    this.__selectionBox.selections.forEach((selection: Gate) => selection.$destroy());
    EVENT_BUS.publish({ topic: 'DEFAULT' });
  }
}
