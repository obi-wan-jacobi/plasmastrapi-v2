import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { getClosestTarget } from './DefaultTool';
import { app } from 'app/main';
import MoveCommand from 'app/commands/MoveCommand';
import IEntity from 'engine/interfaces/IEntity';

export default class MoveTool extends InputHandler {

  private __start: IPoint;
  private __target: IEntity;


  public init({ x, y }: IPoint): void {
    this.__start = { x, y };
    this.__target = getClosestTarget({ x, y }) as any;
  }

  public dispose(): void {

  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__target.$patch(PoseComponent, { x: mouseEvent.x, y: mouseEvent.y });
  }

  public [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    app.controllers.command.invoke(new MoveCommand({
      target: this.__target, start: this.__start, destination: event,
    }));
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

}