import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import Wire from 'digital-logic/wires/Wire';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import LineComponent from 'foundation/geometry/components/LineComponent';
import { entityTouchesLine } from 'foundation/helpers/entities';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import CursorTrail from './CursorTrail';

export default class WireCutterTool extends InputHandler {

  private __isCuttingActive = false;
  private __cuttingPath = new CursorTrail();

  public init(): void {}

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
    ENTITIES.forEvery(Wire)((wire) => {
      if (entityTouchesLine(wire, line.path)) {
        wire.$destroy();
      }
    });
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  public dispose(): void {
    this.__cuttingPath.$destroy();
  }

}