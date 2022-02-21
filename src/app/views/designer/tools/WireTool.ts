import InputTerminal from 'digital-logic/entities/InputTerminal';
import OutputTerminal from 'digital-logic/entities/OutputTerminal';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import MouseComponent from 'html5-canvas/components/MouseComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IHTML5CanvasEntity from 'html5-canvas/interfaces/IHTML5CanvasEntity';
import IKeyboardEvent from 'html5-canvas/interfaces/IKeyboardEvent';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import UIEntity from 'ui/abstracts/UIEntity';
import DesignerTool from '../abstracts/DesignerTool';
import Wire from '../../../../digital-logic/entities/Wire';
import WireFactory from './WireFactory';

const WIRES = new WireFactory();

export { WIRES };

export default class WireTool extends DesignerTool {

  private __target: InputTerminal | OutputTerminal;
  private __tempHandle: IHTML5CanvasEntity;
  private __tempWire: Wire;

  public equip({ mouseEvent, keyboardEvent, designerEvent }: { mouseEvent?: IMouseEvent; keyboardEvent?: IKeyboardEvent; designerEvent: IPipeEvent }): void {
    super.equip({ mouseEvent, keyboardEvent, designerEvent });
    this.__target = designerEvent.target! as InputTerminal | OutputTerminal;
    this.__tempHandle = new UIEntity({
      pose: {
        x: mouseEvent!.x,
        y: mouseEvent!.y,
        a: 0,
      },
      shape: {
        width: 10,
        height: 10,
      },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
    });
    this.__tempWire = new Wire({ head: this.__target, tail: this.__tempHandle });
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent?: IMouseEvent }): void {
    this.__tempHandle.$moveTo(mouseEvent!);
    this.__tempWire.updatePose();
  }

  public [MOUSE_EVENT.MOUSE_UP](): void {
    this.dispose();
    this.__createWireAsNeeded();
    this.__tempHandle.$destroy();
    this.__tempWire.$destroy();
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
    if (terminal instanceof InputTerminal) {
      WIRES.add({ input: terminal, output: this.__target });
      return;
    } else {
      WIRES.add({ input: this.__target, output: terminal });
      return;
    }
  }

}