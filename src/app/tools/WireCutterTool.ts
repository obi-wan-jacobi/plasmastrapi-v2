import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { app } from 'app/main';
import Wire from 'digital-logic/wires/Wire';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import LineComponent from 'foundation/geometry/components/LineComponent';
import { entityTouchesLine } from 'foundation/helpers/entities';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import CursorTrail from './CursorTrail';
import DestroyWiresCommand from 'app/commands/DestroyWiresCommand';

export default class WireCutterTool extends InputHandler {

  private __isCuttingActive: boolean;
  private __cuttingPath: CursorTrail;

  public init(): void {
    this.__isCuttingActive = false;
    this.__cuttingPath = new CursorTrail();
  }

  public [MOUSE_EVENT.MOUSE_DOWN](mouseEvent: IMouseEvent): void {
    this.__isCuttingActive = true;
    this.__cuttingPath.addNewPoint(mouseEvent!);
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    if (!this.__isCuttingActive) {
      return;
    }
    this.__cuttingPath.addNewPoint(mouseEvent!);
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    const line = this.__cuttingPath.$copy(LineComponent)!;
    const targetWiresToCut: Wire[] = [];
    ENTITIES.forEvery(Wire)((wire) => {
      if (entityTouchesLine(wire, line.path)) {
        targetWiresToCut.push(wire);
      }
    });
    app.controllers.command.invoke(new DestroyWiresCommand(targetWiresToCut));
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  public dispose(): void {
    this.__cuttingPath.$destroy();
  }

}