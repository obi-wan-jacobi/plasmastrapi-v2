import InputTerminal from 'app/gates/InputTerminal';
import OutputTerminal from 'app/gates/OutputTerminal';
import { RGBA_0 } from 'app/ui/COLOUR';
import AnimationRule from 'contraptions/augments/AnimationRule';
import StopTranslationRule from 'contraptions/augments/StopTranslationRule';
import VelocityRule from 'contraptions/augments/VelocityRule';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import TranslationComponent from 'foundation/geometry/components/TranslationComponent';
import RigidBodyComponent from 'foundation/physics/components/RigidBodyComponent';
import VelocityComponent from 'foundation/physics/components/VelocityComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import HorizontalThreadedAxle from './HorizontalThreadedAxle';
import MachineInput from './MachineInput';

export default class Claw extends HTML5CanvasElement {

  public inputs: MachineInput[];

  private __wrist: HTML5CanvasElement;
  private __palm: HTML5CanvasElement;
  private __leftHub: HTML5CanvasElement;
  private __rightHub: HTML5CanvasElement;
  private __leftThread: HorizontalThreadedAxle;
  private __rightThread: HorizontalThreadedAxle;
  private __leftTooth: HTML5CanvasElement;
  private __rightTooth: HTML5CanvasElement;
  private __openMotor: HTML5CanvasElement;
  private __closeMotor: HTML5CanvasElement;

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent)({ x, y, a: 0 });
    const iClose = new MachineInput({ x: 0, y: 0 });
    const iOpen = new MachineInput({ x: 0, y: 0 });
    this.__wrist = this.$appendChild(new HTML5CanvasElement());
    this.__wrist.$add(PoseComponent)({ x, y: y - 15, a: 0 });
    this.__wrist.$add(ShapeComponent)({
      vertices: [
        { x: 10, y: 5 },
        { x: -10, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__wrist.$add(StyleComponent)({ colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    //touchactivator
    this.__palm = this.$appendChild(new HTML5CanvasElement());
    this.__palm.$add(PoseComponent)({ x, y: y + 10, a: 0 });
    this.__palm.$add(ShapeComponent)({
      vertices: [
        { x: 10, y: 10 },
        { x: -10, y: 10 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
      ],
    });
    this.__palm.$add(StyleComponent)({ colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__palm.$add(RigidBodyComponent)({});
    // touchsensor
    this.__leftHub = this.$appendChild(new HTML5CanvasElement());
    this.__leftHub.$add(PoseComponent)({ x: x - 52, y: y + 10, a: 0 });
    this.__leftHub.$add(ShapeComponent)({
      vertices: [
        { x: 2, y: 10 },
        { x: -2, y: 10 },
        { x: -2, y: -10 },
        { x: 2, y: -10 },
      ],
    });
    this.__leftHub.$add(StyleComponent)({ colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__leftHub.$add(RigidBodyComponent)({});
    //
    this.__rightHub = this.$appendChild(new HTML5CanvasElement());
    this.__rightHub.$add(PoseComponent)({ x: x + 52, y: y + 10, a: 0 });
    this.__rightHub.$add(ShapeComponent)({
      vertices: [
        { x: 2, y: 10 },
        { x: -2, y: 10 },
        { x: -2, y: -10 },
        { x: 2, y: -10 },
      ],
    });
    this.__rightHub.$add(StyleComponent)({ colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__leftThread = this.$appendChild(new HorizontalThreadedAxle({
      x: x - 30, y: y + 10, width: 40, height: 20,
    }));
    this.__leftThread.$appendChild(new AnimationRule({ inputs: [iClose], high: { isPaused: false, isReversed: true } }));
    this.__leftThread.$appendChild(new AnimationRule({ inputs: [iOpen], high: { isPaused: false, isReversed: false } }));
    this.__leftThread.$appendChild(new AnimationRule({ inputs: [iClose, iOpen], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__rightThread = this.$appendChild(new HorizontalThreadedAxle({
      x: x + 30, y: y + 10, width: 40, height: 20,
    }));
    this.__rightThread.$appendChild(new AnimationRule({ inputs: [iClose], high: { isPaused: false, isReversed: false } }));
    this.__rightThread.$appendChild(new AnimationRule({ inputs: [iOpen], high: { isPaused: false, isReversed: true } }));
    this.__rightThread.$appendChild(new AnimationRule({ inputs: [iClose, iOpen], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    // touchactivator
    this.__leftTooth = this.$appendChild(new HTML5CanvasElement());
    this.__leftTooth.$add(PoseComponent)({ x: x - 39, y: y + 10, a: 0 });
    this.__leftTooth.$add(ShapeComponent)({
    vertices: [
      { x: 10, y: 60 },
      { x: -0, y: 60 },
      { x: -0, y: 20 },
      { x: -10, y: 20 },
      { x: -10, y: -20 },
      { x: 10, y: -20},
    ]});
    this.__leftTooth.$add(StyleComponent)({ colour: 'WHITE', opacity: 1, fill: 'BLACK', zIndex: 3 });
    this.__leftTooth.$add(VelocityComponent)({ x: 0, y: 0, w: 0 });
    this.__leftTooth.$add(RigidBodyComponent)({});
    this.__leftTooth.$appendChild(new VelocityRule({ inputs: [iClose], high: { x: 0.1 }}));
    this.__leftTooth.$appendChild(new VelocityRule({ inputs: [iOpen], high: { x: -0.1 }}));
    this.__leftTooth.$appendChild(new VelocityRule({ inputs: [iClose, iOpen], high: { x: 0 }, low: { x: 0 }, off: { x: 0 } }));
    // touchsensor
    this.__rightTooth = this.$appendChild(new HTML5CanvasElement());
    this.__rightTooth.$add(PoseComponent)({ x: x + 40, y: y + 10, a: 0 });
    this.__rightTooth.$add(ShapeComponent)({
      vertices: [
        { x: 0, y: 20 },
        { x: 0, y: 60 },
        { x: -10, y: 60 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
        { x: 10, y: 20 },
      ]});
    this.__rightTooth.$add(StyleComponent)({ colour: 'WHITE', opacity: 1, fill: 'BLACK', zIndex: 3 });
    this.__rightTooth.$add(VelocityComponent)({ x: 0, y: 0, w: 0 });
    // this.__rightTooth.$appendChild(new VelocityRule({ inputs: [iClose], high: { x: -1 }}));
    // this.__rightTooth.$appendChild(new VelocityRule({ inputs: [iOpen], high: { x: 1 }}));
    // this.__rightTooth.$appendChild(new VelocityRule({ inputs: [iClose, iOpen], high: { x: 0 }, low: { x: 0 }, off: { x: 0 } }));
    this.inputs = [iClose, iOpen];
  }
}
