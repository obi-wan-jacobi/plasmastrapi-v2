import IEntity from 'engine/interfaces/IEntity';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import DesignerTool from '../abstracts/DesignerTool';
import SelectionBox from './SelectionBox';

export default class SelectionTool extends DesignerTool<{}> {

  private __selectionBox: SelectionBox;

  public constructor({ mouseEvent }: { initiator?: IEntity; target?: {}; mouseEvent: IMouseEvent; isDesignPaletteHovered: boolean }) {
    super(arguments[0]);
    this.__selectionBox = new SelectionBox(mouseEvent);
  }

  public dispose(): void {
    super.dispose();
    this.__selectionBox.$destroy();
  }

  public [MOUSE_EVENT.CLICK](): void {
    this.dispose();
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent: IMouseEvent }): void {
    super[MOUSE_EVENT.MOUSE_MOVE](arguments[0]);
    if (!this._isDesignerPaletteHovered) {
      return;
    }
    this.__selectionBox.stretchTo(mouseEvent);
  }

}