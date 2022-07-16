import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import InputHandler from 'app/abstracts/InputHandler';
import Gate from 'digital-logic/abstracts/Gate';
import EVENT_BUS from 'app/EVENT_BUS';
import { Etor } from 'engine/types';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import PoseComponent from 'foundation/geometry/components/PoseComponent';

export default class CreatorTool extends InputHandler {

  private __target: Gate;

  public init(arg: { x: number; y: number; Etor: Etor<Gate, any> }): void {
    this.__target = new arg.Etor(arg);
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__target.$patch(PoseComponent, { x: mouseEvent.x, y: mouseEvent.y });
  }

  public [MOUSE_EVENT.CLICK](): void {
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  public dispose(): void {
  }

}