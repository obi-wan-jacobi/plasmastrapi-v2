import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import MoverBox from './MoverBox';

export default class MoverTool extends InputHandler {

  private __start: IPoint;

  public constructor(mouseEvent: IMouseEvent) {
    super();
    const { x, y } = mouseEvent!;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    const { x, y } = mouseEvent!;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    const { dx, dy } = {
      dx: mouseEvent!.x - this.__start.x,
      dy: mouseEvent!.y - this.__start.y,
    };
    ENTITIES.forEvery(MoverBox)((moverBox) => {
      moverBox.moveBy({ dx, dy });
    });
    const { x, y } = mouseEvent!;
    this.__start = { x, y };
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    ENTITIES.forEvery(MoverBox)((moverBox) => moverBox.$destroy());
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  public dispose(): void {}

}