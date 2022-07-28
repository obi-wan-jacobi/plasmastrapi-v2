import InputHandler from 'app/abstracts/InputHandler';
import { TOOL_EVENT } from 'app/enums/TOOL_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import InputTerminal from 'digital-logic/terminals/InputTerminal';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import Wire from 'digital-logic/wires/Wire';
import { RGBA_0, RGBA_WHITE } from 'app/ui/COLOUR';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { getClosestTarget, triggerMouseEventsOnClosestTarget } from './DefaultTool';
import { getAbsolutePose } from 'foundation/helpers/entities';
import { app } from 'app/main';
import CreateWireCommand from 'app/commands/CreateWireCommand';

export default class WireTool extends InputHandler {

  private __target: InputTerminal | OutputTerminal;
  private __tempHandle: IHTML5CanvasElement;
  private __tempWire: Wire;

  public init({ x, y }: IPoint): void {
    this.__target = getClosestTarget({ x, y })! as (InputTerminal | OutputTerminal);
    this.__createTempHandle();
    this.__createTempWire();
  }

  public dispose(): void {
    this.__tempHandle.$destroy();
    this.__tempWire.$destroy();
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__tempHandle.$patch(PoseComponent, mouseEvent!);
    this.__tempWire.$patch(PoseComponent, mouseEvent!);
  }

  public [MOUSE_EVENT.MOUSE_UP](mouseEvent: IMouseEvent): void {
    triggerMouseEventsOnClosestTarget({ event: mouseEvent });
    this.__createWireAsNeeded();
    if (mouseEvent.isShiftDown) {
      this.__tempHandle.$destroy();
      this.__tempWire.$destroy();
      this.__createTempHandle();
      this.__createTempWire();
      return;
    }
    EVENT_BUS.publish({ topic: TOOL_EVENT.DEFAULT});
  }

  private __createWireAsNeeded(): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const TerminalType = this.__target instanceof InputTerminal ? OutputTerminal : InputTerminal;
    const terminal = ENTITIES.find(TerminalType)((terminal) => {
      return !!terminal.$copy(MouseComponent)?.isHovered;
    });
    if (!terminal) {
      return;
    }
    const isWireAlreadyExists = ENTITIES.find(Wire)((wire) => {
      return (wire.input === terminal || wire.output === terminal) && (wire.output === this.__target || wire.input === this.__target);
    });
    if (isWireAlreadyExists) {
      return;
    }
    if (terminal instanceof InputTerminal) {
      app.controllers.command.invoke(
        new CreateWireCommand({
          input$: terminal.$id,
          output$: this.__target.$id,
        })
      );
    } else {
      app.controllers.command.invoke(
        new CreateWireCommand({
          input$: this.__target.$id,
          output$: (terminal as OutputTerminal).$id,
        })
      );
    }
    return;
  }

  private __createTempHandle() {
    const pose = getAbsolutePose(this.__target);
    const width = 10, height = 10;
    this.__tempHandle = new HTML5CanvasElement()
      .$add(PoseComponent, pose)
      .$add(ShapeComponent, {
        vertices: [
          { x: -width / 2, y: -height / 2 },
          { x: -width / 2, y: height / 2 },
          { x: width / 2, y: height / 2 },
          { x: width / 2, y: -height / 2 },
        ],
      })
      .$add(StyleComponent, {
        colour: RGBA_WHITE,
        fill: RGBA_0,
        opacity: 1,
        zIndex: 0,
      });
  }

  private __createTempWire() {
    const mockTerminal = this.__tempHandle.$appendChild(new HTML5CanvasElement());
    const payload = this.__target instanceof InputTerminal
      ? { input: mockTerminal as OutputTerminal, output: this.__target }
      : { input: this.__target, output: mockTerminal as InputTerminal };
    this.__tempWire = new Wire(payload);
  }

}