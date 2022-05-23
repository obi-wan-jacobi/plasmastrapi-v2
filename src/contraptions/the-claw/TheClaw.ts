import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';
import { RGBA_0 } from 'app/ui/COLOUR';
import AnimationTrigger from 'contraptions/triggers/AnimationTrigger';
import ProximityTrigger from 'contraptions/triggers/ProximityTrigger';
import VelocityTrigger from 'contraptions/triggers/VelocityTrigger';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import RigidBodyComponent from 'foundation/physics/components/RigidBodyComponent';
import VelocityComponent from 'foundation/physics/components/VelocityComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import Claw from '../parts/Claw';
import HorizontalThreadedAxle from '../parts/HorizontalThreadedAxle';
import VerticalThreadedAxle from '../parts/VerticalThreadedAxle';

export default class TheClaw extends HTML5CanvasElement {

  public inputs: MachineInput[];
  public outputs: MachineOutput[];

  private __horizontalRail: HorizontalThreadedAxle;
  private __verticalRail: VerticalThreadedAxle;
  private __carriage: HTML5CanvasElement;

  private __leftSensor: HTML5CanvasElement;
  private __rightSensor: HTML5CanvasElement;
  private __topSensor: HTML5CanvasElement;
  private __bottomSensor: HTML5CanvasElement;

  private __claw: Claw;

  private __prize: HTML5CanvasElement;

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    this.__horizontalRail = this.$appendChild(new HorizontalThreadedAxle({ x, y, width: 300, height: 20 }));
    this.__carriage = this.$appendChild(new HTML5CanvasElement());
    this.__carriage.$add(PoseComponent, { x: x, y, a: 0 });
    this.__carriage.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 30 },
        { x: -20, y: 30 },
        { x: -20, y: -30 },
        { x: 20, y: -30 },
      ],
    });
    this.__carriage.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: 'BLACK', zIndex: 3 });
    this.__carriage.$add(VelocityComponent, { x: 0, y: 0, w: 0 });
    this.__carriage.$add(RigidBodyComponent, {});
    this.__leftSensor = this.$appendChild(new HTML5CanvasElement());
    this.__leftSensor.$add(PoseComponent, { x: x - 170, y, a: 0 });
    this.__leftSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 20 },
        { x: -20, y: 20 },
        { x: -20, y: -20 },
        { x: 20, y: -20 },
      ],
    });
    this.__leftSensor.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__leftSensor.$add(RigidBodyComponent, {});
    this.__rightSensor = this.$appendChild(new HTML5CanvasElement());
    this.__rightSensor.$add(PoseComponent, { x: x + 170, y, a: 0 });
    this.__rightSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 20 },
        { x: -20, y: 20 },
        { x: -20, y: -20 },
        { x: 20, y: -20 },
      ],
    });
    this.__rightSensor.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__rightSensor.$add(RigidBodyComponent, {});
    this.__verticalRail = this.__carriage.$appendChild(new VerticalThreadedAxle({
      x, y, width: 20, height: 200,
    }));
    this.__topSensor = this.__verticalRail.$appendChild(new HTML5CanvasElement());
    this.__topSensor.$add(PoseComponent, { x: x, y: y - 105, a: 0 });
    this.__topSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 5 },
        { x: -20, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__topSensor.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__topSensor.$add(RigidBodyComponent, {});
    this.__bottomSensor = this.__verticalRail.$appendChild(new HTML5CanvasElement());
    this.__bottomSensor.$add(PoseComponent, { x: x, y: y + 105, a: 0 });
    this.__bottomSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 5 },
        { x: -20, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__bottomSensor.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__bottomSensor.$add(RigidBodyComponent, {});
    this.__claw = this.__verticalRail.$appendChild(new Claw({
      x: x, y: y + 130,
    }));
    // rules
    const iMoveLeft = new MachineInput();
    const iMoveRight = new MachineInput();
    const oIsLeft = new MachineOutput();
    const oIsRight = new MachineOutput();
    this.__horizontalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveRight], high: { isPaused: false, isReversed: true } }));
    this.__horizontalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveLeft], high: { isPaused: false, isReversed: false } }));
    this.__horizontalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveRight, iMoveLeft], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__carriage.$appendChild(new VelocityTrigger({ inputs: [iMoveRight], high: { x: 0.01 }}));
    this.__carriage.$appendChild(new VelocityTrigger({ inputs: [iMoveLeft], high: { x: -0.01 }}));
    this.__carriage.$appendChild(new VelocityTrigger({ inputs: [iMoveRight, iMoveRight], high: { x: 0 }, low: { x: 0 }, off: { x: 0 } }));
    this.__rightSensor.$appendChild(new ProximityTrigger({ output: oIsRight, target: this.__carriage }));
    this.__leftSensor.$appendChild(new ProximityTrigger({ output: oIsLeft, target: this.__carriage }));
    // io
    this.inputs = [iMoveLeft, iMoveRight].concat(this.__claw.inputs);
    this.outputs = [oIsLeft, oIsRight].concat(this.__claw.outputs);
  }
}
