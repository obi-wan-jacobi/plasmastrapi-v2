import Entity from '../../../engine/abstracts/Entity';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';
import StyleComponent from '../../../framework/presentation/components/StyleComponent';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import ShapeComponent from 'framework/geometry/components/ShapeComponent';
import { getEuclideanDistanceBetweenPoints } from '../../../framework/helpers/geometry';

export default class Wire extends Entity {

  public input: InputTerminal;
  public output: OutputTerminal;

  constructor({ input, output }: { input: InputTerminal; output: OutputTerminal }) {
    super();
    this.input = input;
    this.output = output;
    this.updatePose();
    this.updateShape();
  }

  public high(): void {
    this.$patch(StyleComponent)({ colour: 'GREEN' });
  }

  public low(): void {
    this.$patch(StyleComponent)({ colour: 'RED' });
  }

  public off(): void {
    this.$patch(StyleComponent)({ colour: 'WHITE' });
  }

  public updatePose(): void {
    const inPose = this.input.$copy(PoseComponent);
    const outPose = this.output.$copy(PoseComponent);
    const x = (inPose.x + outPose.x) / 2;
    const y = (inPose.y + outPose.y) / 2;
    const a = Math.atan2(inPose.y - outPose.y, inPose.x - outPose.x);
    this.$add(PoseComponent)({ x, y, a });
  }

  public updateShape(): void {
    const inPose = this.input.$copy(PoseComponent);
    const outPose = this.output.$copy(PoseComponent);
    const length = getEuclideanDistanceBetweenPoints(inPose, outPose);
    this.$add(ShapeComponent)({
      vertices: [
        { x: length / 2, y: 2 },
        { x: - length / 2, y: 2 },
        { x: - length / 2, y: -2 },
        { x: length / 2, y: -2 },
      ],
    });
  }

  public $destroy(): void {
    super.$destroy();
    // this.input.wires.delete(this.id);
    // this.output.wires.delete(this.id);
  }
}
