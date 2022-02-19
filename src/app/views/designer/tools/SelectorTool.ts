import Gate from 'digital-logic/entities/Gate';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import DesignerTool from '../abstracts/DesignerTool';
import MoverBox from './MoverBox';
import SelectionBox from './SelectionBox';

export default class SelectorTool extends DesignerTool {

  private __selectionBox: SelectionBox<Gate>;
  private __moverBox?: MoverBox<Gate>;

  public equip({ mouseEvent, keyboardEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    super.equip({ mouseEvent, keyboardEvent });
    ENTITIES.forEvery(SelectionBox)((selectionBox) => selectionBox.$destroy());
    this.__selectionBox = new SelectionBox({ x: mouseEvent!.x, y: mouseEvent!.y, SelectionType: Gate });
  }

  public dispose(): void {
    super.dispose();
    this.__selectionBox?.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    if (!this.__moverBox) {
      this.__selectionBox.stretchTo(mouseEvent!);
      return;
    }
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    if (this.__selectionBox.selections.size > 0) {
      this.__moverBox = new MoverBox({ selectionBox: this.__selectionBox });
      return;
    }
    this.dispose();
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    const mouse = this.__moverBox?.$copy(MouseComponent);
    if (!mouse?.isHovered) {
      this.__moverBox?.$destroy();
      this.dispose();
    }
  }

}