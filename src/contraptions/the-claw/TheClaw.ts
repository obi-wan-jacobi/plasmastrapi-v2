import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';
import { RGBA_0, RGBA_BLACK, RGBA_WHITE } from 'app/ui/COLOUR';
import ProximityTrigger from 'contraptions/triggers/ProximityTrigger';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import Claw from '../parts/Claw';
import HorizontalThreadedAxle from '../parts/HorizontalThreadedAxle';
import VerticalThreadedAxle from '../parts/VerticalThreadedAxle';
import TranslationTrigger from 'contraptions/triggers/TranslationTrigger';
import Part from 'contraptions/abstracts/Part';
import Contraption from 'contraptions/abstracts/Contraption';
import TwoWayAnimationTrigger from 'contraptions/triggers/TwoWayAnimationTrigger';
import RigidBodyComponent from 'foundation/physics/components/RigidBodyComponent';

export default class TheClaw extends Contraption {

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
    super({ x, y, a: 0 });
    this.__horizontalRail = this.$appendChild(new HorizontalThreadedAxle({ x: 0, y: 0, width: 300, height: 20 }));
    this.__carriage = this.__horizontalRail.$appendChild(
      new Part({ x: -129.99, y: 0, a: 0 })
        .$add(ShapeComponent, {
          vertices: [
            { x: 20, y: 30 },
            { x: -20, y: 30 },
            { x: -20, y: -30 },
            { x: 20, y: -30 },
          ],
        })
        .$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_BLACK, zIndex: 3 })
        .$add(RigidBodyComponent, {})
    );
    this.__leftSensor = this.__horizontalRail.$appendChild(
      new Part({ x: -170, y: 0, a: 0 })
        .$add(ShapeComponent, {
          vertices: [
            { x: 20, y: 20 },
            { x: -20, y: 20 },
            { x: -20, y: -20 },
            { x: 20, y: -20 },
          ],
        })
        .$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 })
    );
    this.__rightSensor = this.__horizontalRail.$appendChild(
      new Part({ x: 170, y: 0, a: 0 })
        .$add(ShapeComponent, {
          vertices: [
            { x: 20, y: 20 },
            { x: -20, y: 20 },
            { x: -20, y: -20 },
            { x: 20, y: -20 },
          ],
        })
        .$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 })
    );
    this.__verticalRail = this.__carriage.$appendChild(new VerticalThreadedAxle({
      x: 0, y: 69.99, width: 20, height: 200,
    }));
    this.__topSensor = this.__verticalRail.$appendChild(
      new Part({ x: 0, y: -105, a: 0 })
        .$add(ShapeComponent, {
          vertices: [
            { x: 20, y: 5 },
            { x: -20, y: 5 },
            { x: -20, y: -5 },
            { x: 20, y: -5 },
          ],
        })
        .$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 })
    );
    this.__bottomSensor = this.__verticalRail.$appendChild(
      new Part({ x: 0, y: 105, a: 0 })
        .$add(ShapeComponent, {
          vertices: [
            { x: 20, y: 5 },
            { x: -20, y: 5 },
            { x: -20, y: -5 },
            { x: 20, y: -5 },
          ],
        })
        .$add(StyleComponent, { colour: RGBA_WHITE, opacity: 1, fill: RGBA_0, zIndex: 2 })
    );
    this.__claw = this.__verticalRail.$appendChild(new Claw({ x: 0, y: 130 }));
    // triggers
    const iMoveLeft = new MachineInput({ labelText: 'Left' });
    const iMoveRight = new MachineInput({ labelText: 'Right' });
    const iMoveDown = new MachineInput({ labelText: 'Down' });
    const iMoveUp = new MachineInput({ labelText: 'Up' });
    const oIsLeft = new MachineOutput({ labelText: 'isLeft' });
    const oIsRight = new MachineOutput({ labelText: 'isRight' });
    const oIsTop = new MachineOutput({ labelText: 'isTop' });
    const oIsBottom = new MachineOutput({ labelText: 'isBottom' });
    this.__horizontalRail.$appendChild(new TwoWayAnimationTrigger({ input1: iMoveLeft, input2: iMoveRight }));
    this.__verticalRail.$appendChild(new TwoWayAnimationTrigger({ input1: iMoveUp, input2: iMoveDown }));
    this.__carriage.$appendChild(new TranslationTrigger({ inputs: [iMoveRight], high: { x: 0.5 }, blockers: [this.__rightSensor]}));
    this.__carriage.$appendChild(new TranslationTrigger({ inputs: [iMoveLeft], high: { x: -0.5 }, blockers: [this.__leftSensor]}));
    this.__rightSensor.$appendChild(new ProximityTrigger(oIsRight));
    this.__leftSensor.$appendChild(new ProximityTrigger(oIsLeft));
    this.__verticalRail.$appendChild(new TranslationTrigger({ inputs: [iMoveDown], high: { y: 0.5 }, bodies: [this.__topSensor], blockers: [this.__carriage]}));
    this.__verticalRail.$appendChild(new TranslationTrigger({ inputs: [iMoveUp], high: { y: -0.5 }, bodies: [this.__bottomSensor], blockers: [this.__carriage]}));
    this.__topSensor.$appendChild(new ProximityTrigger(oIsTop));
    this.__bottomSensor.$appendChild(new ProximityTrigger(oIsBottom));
    // io
    this.inputs = [iMoveLeft, iMoveRight, iMoveDown, iMoveUp].concat(this.__claw.inputs);
    this.outputs = [oIsLeft, oIsRight, oIsTop, oIsBottom].concat(this.__claw.outputs);
  }
}
