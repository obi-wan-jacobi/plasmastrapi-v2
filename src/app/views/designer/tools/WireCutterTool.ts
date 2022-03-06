import Wire from 'digital-logic/entities/Wire';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import LineComponent from 'foundation/geometry/components/LineComponent';
import { entityTouchesLine } from 'foundation/helpers/entities';
import { KEYBOARD_EVENT } from 'html5-canvas/enums/KEYBOARD_EVENT';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import DesignerTool from '../abstracts/DesignerTool';
import CursorTrail from './CursorTrail';

export default class WireCutterTool extends DesignerTool {

  private __isCuttingActive = false;
  private __cuttingPath = new CursorTrail();

  public [MOUSE_EVENT.MOUSE_DOWN]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    this.__isCuttingActive = true;
    this.__cuttingPath.addNewPoint(mouseEvent!);
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    if (!this.__isCuttingActive) {
      return;
    }
    this.__cuttingPath.addNewPoint(mouseEvent!);
  }

  public [MOUSE_EVENT.MOUSE_UP]({ keyboardEvent }: { keyboardEvent?: IKeyboardEvent }): void {
    const line = this.__cuttingPath.$copy(LineComponent)!;
    ENTITIES.forEvery(Wire)((wire) => {
      if (entityTouchesLine(wire, line.path)) {
        wire.$destroy();
      }
    });
    this.__cuttingPath.$destroy();
    if (keyboardEvent?.isShiftKeyDown) {
      return;
    }
    this.dispose();
  }

  public [KEYBOARD_EVENT.KEY_UP]({ keyboardEvent }: { keyboardEvent?: IKeyboardEvent }): void {
    if (keyboardEvent?.key === 'Shift') {
      this.__cuttingPath.$destroy();
      this.dispose();
    }
  }

}