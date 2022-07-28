import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import MoverBox from './MoverBox';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import { IPoint } from 'foundation/geometry/components/PoseComponent';

export default class PasteTool extends InputHandler {

  private __moverBox: MoverBox<any>;

  public init({ x, y }: IPoint): void {
    this.__start = { x, y };
    this.__moverBox = ENTITIES.find(MoverBox)(() => true)!;
  }

  public dispose(): void {
    this.__moverBox.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__moverBox.moveTo(mouseEvent);
  }

  public [MOUSE_EVENT.MOUSE_DOWN](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

}