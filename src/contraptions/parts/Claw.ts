import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';
import { RGBA_0 } from 'app/ui/COLOUR';
import AnimationTrigger from 'contraptions/triggers/AnimationTrigger';
import ProximityTrigger from 'contraptions/triggers/ProximityTrigger';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import VelocityComponent from 'foundation/physics/components/VelocityComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import HorizontalThreadedAxle from './HorizontalThreadedAxle';
import TranslationTrigger from 'contraptions/triggers/TranslationTrigger';
import RelativePoseComponent from 'foundation/geometry/components/RelativePoseComponent';

export default class Claw extends HTML5CanvasElement {

  public inputs: MachineInput[];
  public outputs: MachineOutput[];

  private __wrist: HTML5CanvasElement;
  private __palm: HTML5CanvasElement;
  private __leftHub: HTML5CanvasElement;
  private __rightHub: HTML5CanvasElement;
  private __leftThread: HorizontalThreadedAxle;
  private __rightThread: HorizontalThreadedAxle;
  private __leftTooth: HTML5CanvasElement;
  private __rightTooth: HTML5CanvasElement;

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    this.$add(RelativePoseComponent, { x, y, a: 0 });
    this.__wrist = this.$appendChild(new HTML5CanvasElement());
    this.__wrist.$add(RelativePoseComponent, { x: 0, y: -15, a: 0 });
    this.__wrist.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 5 },
        { x: -10, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__wrist.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__palm = this.$appendChild(new HTML5CanvasElement());
    this.__palm.$add(RelativePoseComponent, { x: 0, y: 10, a: 0 });
    this.__palm.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 10 },
        { x: -10, y: 10 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
      ],
    });
    this.__palm.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__leftHub = this.$appendChild(new HTML5CanvasElement());
    this.__leftHub.$add(RelativePoseComponent, { x: -52, y: 10, a: 0 });
    this.__leftHub.$add(ShapeComponent, {
      vertices: [
        { x: 2, y: 10 },
        { x: -2, y: 10 },
        { x: -2, y: -10 },
        { x: 2, y: -10 },
      ],
    });
    this.__leftHub.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__rightHub = this.$appendChild(new HTML5CanvasElement());
    this.__rightHub.$add(RelativePoseComponent, { x: 52, y: 10, a: 0 });
    this.__rightHub.$add(ShapeComponent, {
      vertices: [
        { x: 2, y: 10 },
        { x: -2, y: 10 },
        { x: -2, y: -10 },
        { x: 2, y: -10 },
      ],
    });
    this.__rightHub.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__leftThread = this.$appendChild(new HorizontalThreadedAxle({
      x: x - 30, y: y + 10, width: 40, height: 20,
    }));
    this.__rightThread = this.$appendChild(new HorizontalThreadedAxle({
      x: x + 30, y: y + 10, width: 40, height: 20,
    }));
    this.__leftTooth = this.$appendChild(new HTML5CanvasElement());
    this.__leftTooth.$add(PoseComponent, { x: x - 35, y: y + 10, a: 0 });
    this.__leftTooth.$add(ShapeComponent, {
    vertices: [
      { x: 10, y: 60 },
      { x: -0, y: 60 },
      { x: -0, y: 20 },
      { x: -10, y: 20 },
      { x: -10, y: -20 },
      { x: 10, y: -20},
    ]});
    this.__leftTooth.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: 'BLACK', zIndex: 3 });
    this.__leftTooth.$add(VelocityComponent, { x: 0, y: 0, w: 0 });
    this.__rightTooth = this.$appendChild(new HTML5CanvasElement());
    this.__rightTooth.$add(PoseComponent, { x: x + 35, y: y + 10, a: 0 });
    this.__rightTooth.$add(ShapeComponent, {
      vertices: [
        { x: 0, y: 20 },
        { x: 0, y: 60 },
        { x: -10, y: 60 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
        { x: 10, y: 20 },
      ]});
    this.__rightTooth.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: 'BLACK', zIndex: 3 });
    this.__rightTooth.$add(VelocityComponent, { x: 0, y: 0, w: 0 });
    // rules
    const iClose = new MachineInput();
    const iOpen = new MachineInput();
    const oClose = new MachineOutput();
    const oOpen = new MachineOutput();
    this.__leftThread.$appendChild(new AnimationTrigger({ inputs: [iClose], high: { isPaused: false, isReversed: true } }));
    this.__leftThread.$appendChild(new AnimationTrigger({ inputs: [iOpen], high: { isPaused: false, isReversed: false } }));
    this.__leftThread.$appendChild(new AnimationTrigger({ inputs: [iClose, iOpen], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__rightThread.$appendChild(new AnimationTrigger({ inputs: [iClose], high: { isPaused: false, isReversed: false } }));
    this.__rightThread.$appendChild(new AnimationTrigger({ inputs: [iOpen], high: { isPaused: false, isReversed: true } }));
    this.__rightThread.$appendChild(new AnimationTrigger({ inputs: [iClose, iOpen], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__leftTooth.$appendChild(new TranslationTrigger({ inputs: [iClose], high: { x: 0.01 }, blockers: [this.__palm]}));
    this.__leftTooth.$appendChild(new TranslationTrigger({ inputs: [iOpen], high: { x: -0.01 }, blockers: [this.__leftHub]}));
    this.__rightTooth.$appendChild(new TranslationTrigger({ inputs: [iClose], high: { x: -0.01 }, blockers: [this.__palm]}));
    this.__rightTooth.$appendChild(new TranslationTrigger({ inputs: [iOpen], high: { x: 0.01 }, blockers: [this.__rightHub]}));
    this.__palm.$appendChild(new ProximityTrigger({ output: oClose, target: this.__leftTooth }));
    this.__leftHub.$appendChild(new ProximityTrigger({ output: oOpen, target: this.__leftTooth }));
    // io
    this.inputs = [iClose, iOpen];
    this.outputs = [oClose, oOpen];
  }
}
