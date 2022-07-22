import { RGBA_0, RGBA_GREEN, RGBA_PINK, RGBA_WHITE } from 'app/ui/COLOUR';
import InputTerminal from 'digital-logic/terminals/InputTerminal';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import { getAbsolutePose } from 'foundation/helpers/entities';
import { getEuclideanDistanceBetweenPoints } from 'foundation/helpers/geometry';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class Wire extends HTML5CanvasElement {

  public input: InputTerminal;
  public output: OutputTerminal;

  public constructor({ input, output }: { input: InputTerminal; output: OutputTerminal }) {
    super();
    this.input = input;
    this.output = output;
    this.output.$parent?.$appendChild(this);
    // let's keep input gate as parent
    this.input.$parent?.$appendChild(this);
    const width = 10, height = 4;
    this.$add(ShapeComponent, {
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(StyleComponent, {
      colour: RGBA_WHITE,
      fill: RGBA_0,
      opacity: 1,
      zIndex: 3,
    });
    this.updatePose();
  }

  public high(): void {
    this.$patch(StyleComponent, { colour: RGBA_GREEN });
  }

  public low(): void {
    this.$patch(StyleComponent, { colour: RGBA_PINK });
  }

  public off(): void {
    this.$patch(StyleComponent, { colour: RGBA_WHITE });
  }

  public $patch<T extends IComponent<any>>(ComponentClass: Ctor<T, any>, data: T | any): this {
    if (ComponentClass.name === PoseComponent.name) {
      this.updatePose();
      return this;
    }
    return super.$patch(ComponentClass, data);
  }

  public $destroy(): void {
    this.input.$parent?.$removeChild(this);
    this.output.$parent?.$removeChild(this);
    super.$destroy();
  }

  public updatePose(): void {
    const headPose = getAbsolutePose(this.input);
    const tailPose = getAbsolutePose(this.output);
    let x = (headPose.x + tailPose.x) / 2;
    let y = (headPose.y + tailPose.y) / 2;
    // atan2 is the secret sauce: https://en.wikipedia.org/wiki/Atan2
    const a = Math.atan2(headPose.y - tailPose.y, headPose.x - tailPose.x);
    // total hack because we have to compensate for $parent
    if (this.$parent) {
      x -= getAbsolutePose(this.$parent).x;
      y -= getAbsolutePose(this.$parent).y;
    }
    super.$patch(PoseComponent, { x, y, a });
    const length = getEuclideanDistanceBetweenPoints(headPose, tailPose);
    const wireHalfHeight = 2;
    this.$patch(ShapeComponent, { vertices: [
        { x: length / 2, y: wireHalfHeight },
        { x: -length / 2, y: wireHalfHeight },
        { x: -length / 2, y: -wireHalfHeight },
        { x: length / 2, y: -wireHalfHeight },
    ]});
  }

}