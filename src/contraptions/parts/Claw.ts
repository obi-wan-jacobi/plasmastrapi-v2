import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';
import { RGBA_0, RGBA_BLACK, RGBA_WHITE } from 'app/ui/COLOUR';
import AnimationTrigger from 'contraptions/triggers/AnimationTrigger';
import ProximityTrigger from 'contraptions/triggers/ProximityTrigger';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HorizontalThreadedAxle from './HorizontalThreadedAxle';
import TranslationTrigger from 'contraptions/triggers/TranslationTrigger';
import Part from 'contraptions/abstracts/Part';
import Contraption from 'contraptions/abstracts/Contraption';

export default class Claw extends Contraption {

  private __wrist: Part;
  private __palm: Part;
  private __leftHub: Part;
  private __rightHub: Part;
  private __leftThread: HorizontalThreadedAxle;
  private __rightThread: HorizontalThreadedAxle;
  private __leftTooth: Part;
  private __rightTooth: Part;

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, a: 0 });
    this.__wrist = this.$appendChild(new Part({ x: 0, y: -15, a: 0 }));
    this.__wrist.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 5 },
        { x: -10, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__wrist.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__palm = this.$appendChild(new Part({ x: 0, y: 10, a: 0 }));
    this.__palm.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 10 },
        { x: -10, y: 10 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
      ],
    });
    this.__palm.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__leftHub = this.$appendChild(new Part({ x: -52, y: 10, a: 0 }));
    this.__leftHub.$add(ShapeComponent, {
      vertices: [
        { x: 2, y: 10 },
        { x: -2, y: 10 },
        { x: -2, y: -10 },
        { x: 2, y: -10 },
      ],
    });
    this.__leftHub.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__rightHub = this.$appendChild(new Part({ x: 52, y: 10, a: 0 }));
    this.__rightHub.$add(ShapeComponent, {
      vertices: [
        { x: 2, y: 10 },
        { x: -2, y: 10 },
        { x: -2, y: -10 },
        { x: 2, y: -10 },
      ],
    });
    this.__rightHub.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__leftThread = this.$appendChild(new HorizontalThreadedAxle({
      x: -30, y: 10, width: 40, height: 20,
    }));
    this.__rightThread = this.$appendChild(new HorizontalThreadedAxle({
      x: 30, y: 10, width: 40, height: 20,
    }));
    this.__leftTooth = this.$appendChild(new Part({ x: -39.99, y: 10, a: 0 }));
    this.__leftTooth.$add(ShapeComponent, {
    vertices: [
      { x: 10, y: 60 },
      { x: -0, y: 60 },
      { x: -0, y: 20 },
      { x: -10, y: 20 },
      { x: -10, y: -20 },
      { x: 10, y: -20},
    ]});
    this.__leftTooth.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_BLACK, zIndex: 3 });
    this.__rightTooth = this.$appendChild(new Part({ x: 39.99, y: 10, a: 0 }));
    this.__rightTooth.$add(ShapeComponent, {
      vertices: [
        { x: 0, y: 20 },
        { x: 0, y: 60 },
        { x: -10, y: 60 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
        { x: 10, y: 20 },
      ]});
    this.__rightTooth.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_BLACK, zIndex: 3 });
    // rules
    const iClose = new MachineInput({ labelText: 'Close' });
    const iOpen = new MachineInput({ labelText: 'Open' });
    const oClose = new MachineOutput({ labelText: 'isClosed' });
    const oOpen = new MachineOutput({ labelText: 'isOpen' });
    this.__leftThread.$appendChild(new AnimationTrigger({ inputs: [iClose], high: { isPaused: false, isReversed: true } }));
    this.__leftThread.$appendChild(new AnimationTrigger({ inputs: [iOpen], high: { isPaused: false, isReversed: false } }));
    this.__leftThread.$appendChild(new AnimationTrigger({ inputs: [iClose, iOpen], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__rightThread.$appendChild(new AnimationTrigger({ inputs: [iClose], high: { isPaused: false, isReversed: false } }));
    this.__rightThread.$appendChild(new AnimationTrigger({ inputs: [iOpen], high: { isPaused: false, isReversed: true } }));
    this.__rightThread.$appendChild(new AnimationTrigger({ inputs: [iClose, iOpen], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__leftTooth.$appendChild(new TranslationTrigger({ inputs: [iClose], high: { x: 0.5 }, blockers: [this.__palm]}));
    this.__leftTooth.$appendChild(new TranslationTrigger({ inputs: [iOpen], high: { x: -0.5 }, blockers: [this.__leftHub]}));
    this.__rightTooth.$appendChild(new TranslationTrigger({ inputs: [iClose], high: { x: -0.5 }, blockers: [this.__palm]}));
    this.__rightTooth.$appendChild(new TranslationTrigger({ inputs: [iOpen], high: { x: 0.5 }, blockers: [this.__rightHub]}));
    this.__palm.$appendChild(new ProximityTrigger({ output: oClose, target: this.__leftTooth }));
    this.__leftHub.$appendChild(new ProximityTrigger({ output: oOpen, target: this.__leftTooth }));
    // io
    this.inputs = [iClose, iOpen];
    this.outputs = [oClose, oOpen];
  }

}
