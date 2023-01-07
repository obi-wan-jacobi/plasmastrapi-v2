import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import MoverBox from './MoverBox';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import { app } from 'app/main';
import MoverBoxCommand from 'app/commands/MoverBoxCommand';

export default class MoveManyTool extends InputHandler {

  private __moverBox: MoverBox<DigitalElement>;

  public init({ x, y }: IPoint): void {
    this.__start = { x, y };
    this.__moverBox = ENTITIES.first(MoverBox)!;
    this.__moverBox.init({ x, y });
  }

  public dispose(): void {
    this.__moverBox.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__moverBox.moveTo(mouseEvent);
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    app.controllers.command.invoke(new MoverBoxCommand({ moverBox: this.__moverBox }));
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

}