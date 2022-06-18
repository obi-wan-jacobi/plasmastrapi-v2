import MachineInput from 'contraptions/parts/MachineInput';
import MachineOutput from 'contraptions/parts/MachineOutput';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import VerticalThreadedAxle from '../parts/VerticalThreadedAxle';
import TranslationTrigger from 'contraptions/triggers/TranslationTrigger';
import Part from 'contraptions/abstracts/Part';
import TestPart from 'contraptions/parts/TestPart';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { RGBA_0 } from 'app/ui/COLOUR';

export default class TestRig extends Part {

  public inputs: MachineInput[];
  public outputs: MachineOutput[];

  private __verticalRail: VerticalThreadedAxle;

  private __wrist: Part;
  private __palm: Part;

  private __testPart: TestPart;

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    // this.__verticalRail = this.$appendChild(new VerticalThreadedAxle({
    //   x, y, width: 20, height: 200,
    // }));
    this.__wrist = this.$appendChild(new Part());
    this.__wrist.$add(PoseComponent, { x: 0, y: -15, a: 0 });
    this.__wrist.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 5 },
        { x: -10, y: 5 },
        { x: -20, y: -5 },
        { x: 20, y: -5 },
      ],
    });
    this.__wrist.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__palm = this.$appendChild(new Part());
    this.__palm.$add(PoseComponent, { x: 0, y: 10, a: 0 });
    this.__palm.$add(ShapeComponent, {
      vertices: [
        { x: 10, y: 10 },
        { x: -10, y: 10 },
        { x: -10, y: -20 },
        { x: 10, y: -20 },
      ],
    });
    this.__palm.$add(StyleComponent, { colour: 'WHITE', opacity: 1, fill: RGBA_0, zIndex: 2 });
    this.__testPart = this.$appendChild(new TestPart({
      x: 0, y: 130,
    }));
    // triggers
    const iMoveDown = new MachineInput();
    const iMoveUp = new MachineInput();
    this.__testPart.$appendChild(new TranslationTrigger({ inputs: [iMoveDown], high: { y: 0.5 }, bodies: [], blockers: []}));
    this.__testPart.$appendChild(new TranslationTrigger({ inputs: [iMoveUp], high: { y: -0.5 }, bodies: [], blockers: []}));
    // io
    this.inputs = [iMoveDown, iMoveUp];
    this.outputs = [];
  }
}
