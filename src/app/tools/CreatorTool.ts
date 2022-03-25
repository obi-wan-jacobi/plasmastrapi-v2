import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import InputHandler from 'app/abstracts/InputHandler';
import Gate from 'app/abstracts/Gate';
import EVENT_BUS from 'app/EVENT_BUS';
import { Etor } from 'engine/types';

export default class CreatorTool extends InputHandler {

  private __target?: Gate;

  public constructor({ target }: { target: { etor: Etor<Gate, any>; event: IMouseEvent } }) {
    super();
    this.__target = new target.etor(target.event);
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__target?.$moveTo({ x: mouseEvent!.x, y: mouseEvent!.y });
  }

  public [MOUSE_EVENT.CLICK](): void {
    this.__target = undefined;
    EVENT_BUS.publish({ topic: 'DEFAULT' });
  }

  public dispose(): void {
    this.__target?.$destroy();
  }

}