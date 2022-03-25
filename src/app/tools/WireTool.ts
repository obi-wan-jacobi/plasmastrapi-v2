import InputHandler from 'app/abstracts/InputHandler';
import EVENT_BUS from 'app/EVENT_BUS';
import InputTerminal from 'app/gates/InputTerminal';
import OutputTerminal from 'app/gates/OutputTerminal';
import Wire from 'app/gates/Wire';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import { triggerEventsOnClosestTarget } from './DefaultTool';

export default class WireTool extends InputHandler {

  private __target: InputTerminal | OutputTerminal;
  private __tempHandle: IHTML5CanvasElement;
  private __tempWire: Wire;

  public constructor({ target }: { target: IHTML5CanvasElement }) {
    super();
    this.__target = target as InputTerminal | OutputTerminal;
    const pose = target.$copy(PoseComponent)!;
    const width = 10, height = 10;
    this.__tempHandle = new HTML5CanvasElement();
    this.__tempHandle.$add(PoseComponent)(pose);
    this.__tempHandle.$add(ShapeComponent)({
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.__tempHandle.$add(StyleComponent)({
      colour: 'WHITE',
      fill: 'rgba(0,0,0,0)',
      opacity: 1,
      zIndex: 0,
    });
    this.__tempHandle.$parent = {
      connectInput: () => {},
      connectOutput: () => {},
      disconnect: () => {},
      $removeChild: () => {}} as any;
    const payload = this.__target instanceof InputTerminal
      ? { input: this.__target, output: this.__tempHandle as OutputTerminal }
      : { input: this.__tempHandle as OutputTerminal, output: this.__target };
    this.__tempWire = new Wire(payload);
  }

  public [MOUSE_EVENT.MOUSE_MOVE](mouseEvent: IMouseEvent): void {
    this.__tempHandle.$moveTo(mouseEvent!);
    this.__tempWire.updatePose();
  }

  public [MOUSE_EVENT.MOUSE_UP](mouseEvent: IMouseEvent): void {
    EVENT_BUS.publish({ topic: 'DEFAULT' });
    triggerEventsOnClosestTarget({ event: mouseEvent });
    this.__createWireAsNeeded();
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
      new Wire({ input: terminal, output: this.__target });
    } else {
      new Wire({ input: this.__target, output: terminal });
    }
    return;
  }

  public dispose(): void {
    this.__tempHandle.$destroy();
    this.__tempWire.$destroy();
  }

}