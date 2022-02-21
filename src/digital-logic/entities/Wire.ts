import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import { getEuclideanDistanceBetweenPoints } from 'foundation/helpers/geometry';
import UIEntity from 'ui/abstracts/UIEntity';

export default class Wire extends UIEntity {

  private __head: IEntity;
  private __tail: IEntity;

  public constructor({ head, tail }: { head: IEntity; tail: IEntity }) {
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
    this.__head = head;
    this.__tail = tail;
    this.updatePose();
  }

  public updatePose(): void {
    const headPose = this.__head.$copy(PoseComponent)!;
    const tailPose = this.__tail.$copy(PoseComponent)!;
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


}