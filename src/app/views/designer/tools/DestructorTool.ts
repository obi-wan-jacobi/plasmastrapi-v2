import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import DesignerTool from '../abstracts/DesignerTool';
import Gate from 'digital-logic/entities/Gate';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import SelectionBox from './SelectionBox';
import { KEYBOARD_EVENT } from 'html5-canvas/enums/KEYBOARD_EVENT';
import StyleComponent from 'foundation/presentation/components/StyleComponent';

export default class DestructorTool extends DesignerTool {

  private __selectionBox: SelectionBox<Gate>;

  public dispose(): void {
    super.dispose();
    this.__selectionBox?.$destroy();
  }

  public [KEYBOARD_EVENT.KEY_UP]({ keyboardEvent }: { keyboardEvent?: IKeyboardEvent }): void {
    if (keyboardEvent?.key === 'Shift') {
      this.dispose();
    }
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    this.__selectionBox?.stretchTo(mouseEvent!);
  }

  public [MOUSE_EVENT.MOUSE_DOWN]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    this.__selectionBox = new SelectionBox({ x: mouseEvent!.x, y: mouseEvent!.y, SelectionType: Gate });
    this.__selectionBox.$patch(StyleComponent)({ colour: 'RED' });
  }

  public [MOUSE_EVENT.MOUSE_UP]({ keyboardEvent }: { keyboardEvent?: IKeyboardEvent }): void {
    this.__selectionBox.selections.forEach((selection: Gate) => selection.$destroy());
    if (keyboardEvent?.key === 'Shift') {
      this.__selectionBox.$destroy();
      return;
    }
    this.dispose();
  }
}
