import Wire from 'digital-logic/entities/Wire';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import DesignerTool from '../abstracts/DesignerTool';
import MoverBox from './MoverBox';

export default class MoverTool extends DesignerTool {

  private __start: IPoint;

  public equip({ mouseEvent, keyboardEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent }): void {
    super.equip({ mouseEvent, keyboardEvent });
    const { x, y } = mouseEvent!;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_DOWN]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    const { x, y } = mouseEvent!;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    const { dx, dy } = {
      dx: mouseEvent!.x - this.__start.x,
      dy: mouseEvent!.y - this.__start.y,
    };
    ENTITIES.forEvery(MoverBox)((moverBox) => {
      moverBox.moveBy({ dx, dy });
      ENTITIES.forEvery(Wire)((wire) => {
        wire.updatePose();
      });
    });
    const { x, y } = mouseEvent!;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    this.dispose();
    ENTITIES.forEvery(MoverBox)((moverBox) => moverBox.$destroy());
  }

}