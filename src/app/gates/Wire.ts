import Gate from 'app/abstracts/Gate';
import { RGBA_0 } from 'app/ui/COLOUR';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import { getEuclideanDistanceBetweenPoints } from 'foundation/helpers/geometry';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';

export default class Wire extends HTML5CanvasElement {

  public input: InputTerminal;
  public output: OutputTerminal;

  public constructor({ input, output }: { input: InputTerminal; output: OutputTerminal }) {
    super();
    this.input = input;
    this.output = output;
    (this.input.$parent as Gate).connectOutput(this);
    (this.output.$parent as Gate).connectInput(this);
    const width = 10, height = 4;
    this.$add(ShapeComponent)({
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(StyleComponent)({
      colour: 'WHITE',
      fill: RGBA_0,
      opacity: 1,
      zIndex: 3,
    });
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

  public high(): void {
    this.$patch(StyleComponent)({ colour: 'GREEN' });
  }

  public low(): void {
    this.$patch(StyleComponent)({ colour: 'PINK' });
  }

  public off(): void {
    this.$patch(StyleComponent)({ colour: 'WHITE' });
  }

  public $destroy(): void {
    super.$destroy();
    (this.input.$parent as Gate).disconnect(this);
    (this.output.$parent as Gate).disconnect(this);
  }

}