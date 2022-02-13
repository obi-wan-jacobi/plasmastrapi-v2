import Gate from 'digital-logic/entities/Gate';
import IEntity from 'engine/interfaces/IEntity';
import { KEYBOARD_EVENT } from 'html5-canvas/enums/KEYBOARD_EVENT';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import DesignerTool from '../abstracts/DesignerTool';
import SelectionBox from './SelectionBox';

export default class SelectorTool extends DesignerTool<{}> {

  private __selectionBox: SelectionBox<Gate>;
  private __selections: Set<Gate>;

  public constructor({ mouseEvent }: { initiator?: IEntity; target?: {}; mouseEvent: IMouseEvent; isDesignPaletteHovered: boolean }) {
    super(arguments[0]);
    this.__selectionBox = new SelectionBox({ x: mouseEvent.x, y: mouseEvent.y, SelectionType: Gate });
  }

  public dispose(): void {
    super.dispose();
    this.__selectionBox!.$destroy();
  }

  public [MOUSE_EVENT.CLICK]({ mouseEvent }: { mouseEvent: IMouseEvent }): void {
    console.log(mouseEvent);
    this.__selectionBox.stretchTo(this._prevDefinedMouseEvent!);
    this.__selections = this.__selectionBox!.selections;
    // this.dispose();
  }

  public [KEYBOARD_EVENT.KEY_UP]({ keyboardEvent }: { keyboardEvent: IKeyboardEvent }): void {
    if (keyboardEvent.key !== 'Delete') {
      return;
    }
    this.__selections.forEach((gate) => gate.$destroy());
    this.dispose();
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent: IMouseEvent }): void {
    super[MOUSE_EVENT.MOUSE_MOVE](arguments[0]);
    if (!this._isDesignerPaletteHovered) {
      return;
    }
    if (!this.__selectionBox) {
      return;
    }
    this.__selectionBox!.stretchTo(mouseEvent);
  }

}