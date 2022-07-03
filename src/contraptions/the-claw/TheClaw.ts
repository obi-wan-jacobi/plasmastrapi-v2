import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';
import { RGBA_0, RGBA_BLACK, RGBA_WHITE } from 'app/ui/COLOUR';
import AnimationTrigger from 'contraptions/triggers/AnimationTrigger';
import ProximityTrigger from 'contraptions/triggers/ProximityTrigger';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import Claw from '../parts/Claw';
import HorizontalThreadedAxle from '../parts/HorizontalThreadedAxle';
import VerticalThreadedAxle from '../parts/VerticalThreadedAxle';
import TranslationTrigger from 'contraptions/triggers/TranslationTrigger';
import Part from 'contraptions/abstracts/Part';

export default class TheClaw extends Part {

  public inputs: MachineInput[];
  public outputs: MachineOutput[];

  private __horizontalRail: HorizontalThreadedAxle;
  private __verticalRail: VerticalThreadedAxle;
  private __carriage: Part;

  private __leftSensor: Part;
  private __rightSensor: Part;
  private __topSensor: Part;
  private __bottomSensor: Part;

  private __claw: Claw;

  private __prize: Part;

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0});
    this.__horizontalRail = this.$appendChild(new HorizontalThreadedAxle({ x: 0, y: 0, width: 300, height: 20 }));
    this.__carriage = this.__horizontalRail.$appendChild(new Part());
    this.__carriage.$add(PoseComponent, { x: -129.99, y: 0, a: 0 });
    this.__carriage.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 30 },
        { x: -20, y: 30 },
        { x: -20, y: -30 },
        { x: 20, y: -30 },
      ],
    });
    this.__carriage.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_BLACK, zIndex: 3 });
    this.__leftSensor = this.__horizontalRail.$appendChild(new Part());
    this.__leftSensor.$add(PoseComponent, { x: -170, y: 0, a: 0 });
    this.__leftSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 20 },
        { x: -20, y: 20 },
        { x: -20, y: -20 },
        { x: 20, y: -20 },
      ],
    });
    this.__leftSensor.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__rightSensor = this.__horizontalRail.$appendChild(new Part());
    this.__rightSensor.$add(PoseComponent, { x: 170, y: 0, a: 0 });
    this.__rightSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 20 },
        { x: -20, y: 20 },
        { x: -20, y: -20 },
        { x: 20, y: -20 },
      ],
    });
    this.__rightSensor.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__verticalRail = this.__carriage.$appendChild(new VerticalThreadedAxle({
      x: 0, y: 69.99, width: 20, height: 200,
    }));
    this.__topSensor = this.__verticalRail.$appendChild(new Part());
    this.__topSensor.$add(PoseComponent, { x: 0, y: -105, a: 0 });
    this.__topSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 5 },
        { x: -20, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__topSensor.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__bottomSensor = this.__verticalRail.$appendChild(new Part());
    this.__bottomSensor.$add(PoseComponent, { x: 0, y: 105, a: 0 });
    this.__bottomSensor.$add(ShapeComponent, {
      vertices: [
        { x: 20, y: 5 },
        { x: -20, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__bottomSensor.$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__claw = this.__verticalRail.$appendChild(new Claw({
      x: 0, y: 130,
    }));
    // triggers
    const iMoveLeft = new MachineInput({ labelText: 'Left' });
    const iMoveRight = new MachineInput({ labelText: 'Right' });
    const iMoveDown = new MachineInput({ labelText: 'Down' });
    const iMoveUp = new MachineInput({ labelText: 'Up' });
    const oIsLeft = new MachineOutput({ labelText: 'isLeft' });
    const oIsRight = new MachineOutput({ labelText: 'isRight' });
    const oIsTop = new MachineOutput({ labelText: 'isTop' });
    const oIsBottom = new MachineOutput({ labelText: 'isBottom' });
    this.__horizontalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveRight], high: { isPaused: false, isReversed: true } }));
    this.__horizontalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveLeft], high: { isPaused: false, isReversed: false } }));
    this.__horizontalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveRight, iMoveLeft], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__verticalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveUp], high: { isPaused: false, isReversed: true } }));
    this.__verticalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveDown], high: { isPaused: false, isReversed: false } }));
    this.__verticalRail.$appendChild(new AnimationTrigger({ inputs: [iMoveUp, iMoveDown], high: { isPaused: true }, low: { isPaused: true }, off: { isPaused: true } }));
    this.__carriage.$appendChild(new TranslationTrigger({ inputs: [iMoveRight], high: { x: 0.5 }, blockers: [this.__rightSensor]}));
    this.__carriage.$appendChild(new TranslationTrigger({ inputs: [iMoveLeft], high: { x: -0.5 }, blockers: [this.__leftSensor]}));
    this.__rightSensor.$appendChild(new ProximityTrigger({ output: oIsRight, target: this.__carriage }));
    this.__leftSensor.$appendChild(new ProximityTrigger({ output: oIsLeft, target: this.__carriage }));
    this.__verticalRail.$appendChild(new TranslationTrigger({ inputs: [iMoveDown], high: { y: 0.5 }, bodies: [this.__topSensor], blockers: [this.__carriage]}));
    this.__verticalRail.$appendChild(new TranslationTrigger({ inputs: [iMoveUp], high: { y: -0.5 }, bodies: [this.__bottomSensor], blockers: [this.__carriage]}));
    this.__topSensor.$appendChild(new ProximityTrigger({ output: oIsTop, target: this.__carriage }));
    this.__bottomSensor.$appendChild(new ProximityTrigger({ output: oIsBottom, target: this.__carriage }));
    // io
    this.inputs = [iMoveLeft, iMoveRight, iMoveDown, iMoveUp].concat(this.__claw.inputs);
    this.outputs = [oIsLeft, oIsRight, oIsTop, oIsBottom].concat(this.__claw.outputs);
  }

  public reset(): void {
    this.__carriage.$patch(PoseComponent, { x: -129.99, y: 0, a: 0 });
    this.__verticalRail.$patch(PoseComponent, { x: 0, y: 69.99, a: 0 });
    this.__claw.reset();
  }
}
