import DesignerTool from '../abstracts/DesignerTool';
import Gate from 'digital-logic/entities/Gate';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import { KEYBOARD_EVENT } from 'html5-canvas/enums/KEYBOARD_EVENT';

export default class CreatorTool extends DesignerTool {

  private __target?: Gate;

  public equip({ mouseEvent, keyboardEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    super.equip({ mouseEvent, keyboardEvent });
    this.__preview({ mouseEvent });
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    this.__target?.$moveTo({ x: mouseEvent!.x, y: mouseEvent!.y });
  }

  public [MOUSE_EVENT.CLICK]({ mouseEvent, keyboardEvent }: { mouseEvent: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    if (keyboardEvent?.isShiftKeyDown) {
      this.__preview({ mouseEvent });
      return;
    }
    this.__target = undefined;
    this.dispose();
  }

  public [KEYBOARD_EVENT.KEY_UP]({ keyboardEvent }: { keyboardEvent?: IKeyboardEvent }): void {
    if (keyboardEvent?.key === 'Shift') {
      this.dispose();
    }
  }

  public dispose(): void {
    super.dispose();
    this.__target?.$destroy();
  }

  private __preview({ mouseEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    const { x, y } = mouseEvent || { x: 0, y: 0 };
    this.__target = new Gate({ x, y, src: './AndGate.png' });
  }

}