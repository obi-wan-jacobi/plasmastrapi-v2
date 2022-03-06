import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import { getEuclideanDistanceBetweenPoints } from 'foundation/helpers/geometry';
import UIEntity from 'ui/abstracts/UIEntity';
import Gate from './Gate';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';

export default class Wire extends UIEntity {

  public input: InputTerminal;
  public output: OutputTerminal;

  public constructor({ input, output }: { input: InputTerminal; output: OutputTerminal }) {
    super({
      pose: { x: 0, y: 0, a: 0 },
      shape: {
        width: 1,
        height: 4,
      },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
    });
    this.input = input;
    this.output = output;
    if (this.input.$parent) {
      (this.input.$parent as Gate).connectInput({ wire: this });
    }
    this.updatePose();
  }

  public updatePose(): void {
    const headPose = this.input.$copy(PoseComponent)!;
    const tailPose = this.output.$copy(PoseComponent)!;
    const x = (headPose.x + tailPose.x) / 2;
    const y = (headPose.y + tailPose.y) / 2;
    // atan2 is the secret sauce: https://en.wikipedia.org/wiki/Atan2
    const a = Math.atan2(headPose.y - tailPose.y, headPose.x - tailPose.x);
    this.$mutate(PoseComponent)({ x, y, a });
    const length = getEuclideanDistanceBetweenPoints(headPose, tailPose);
    const wireHalfHeight = 2;
    this.$mutate(ShapeComponent)({ vertices: [
        { x: length / 2, y: wireHalfHeight },
        { x: -length / 2, y: wireHalfHeight },
        { x: -length / 2, y: -wireHalfHeight },
        { x: length / 2, y: -wireHalfHeight },
    ]});
  }

  public $destroy(): void {
    super.$destroy();
    if (this.input.$parent) {
      (this.input.$parent as Gate).removeInput({ wire: this });
    }
  }

}