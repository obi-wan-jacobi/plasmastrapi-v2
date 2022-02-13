import IEntity from 'engine/interfaces/IEntity';
import DesignerTool from '../abstracts/DesignerTool';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import Gate from 'digital-logic/entities/Gate';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';

export default class CreatorTool extends DesignerTool<IEntity> {

  public constructor({}: { initiator: IEntity; mouseEvent: IMouseEvent; isDesignPaletteHovered: boolean }) {
    super(arguments[0]);
  }

  public equip(): void {
    super.equip();
    this.__preview();
  }

  public [MOUSE_EVENT.MOUSE_UP]({ keyboardEvent }: { mouseEvent: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    if (!this._isDesignerPaletteHovered) {
      return;
    }
    if (keyboardEvent?.isShiftKeyDown) {
      return;
    }
    this.dispose();
  }

  private __preview(): void {
    const { x, y } = this._prevDefinedMouseEvent || { x: 0, y: 0 };
    this._target = new Gate({ x, y, src: './AndGate.png' });
  }

}