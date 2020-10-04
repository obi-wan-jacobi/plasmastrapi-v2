import Entity from '../../../../engine/Entity';
import PoseComponent, { IPose } from '../../../../framework/geometry/components/PoseComponent';
import ShapeComponent, { IShape } from '../../../../framework/geometry/components/ShapeComponent';
import IPoseIncrement from '../../interfaces/IPoseIncrement';
import StyleComponent from '../../../../framework/presentation/components/StyleComponent';

export default class MachinePart extends Entity {

  private __initialPose: IPose;

  public constructor({ x, y, shape }: { x: number, y: number, shape?: IShape }) {
    super(arguments[0]);
    this.__initialPose = { x, y, a: 0 };
    this.$add(PoseComponent)({ x, y, a: 0 });
    if (shape) {
      this.$add(ShapeComponent)(shape);
      this.$add(StyleComponent)({ colour: 'WHITE', fill: 'BLACK' });
    }
  }

  public reset(): void {
    this.$mutate(PoseComponent)!(this.__initialPose);
  }

  public step(poseStep: IPoseIncrement): void {
    const pose = this.$copy(PoseComponent)!;
    pose.x += poseStep.x || 0;
    pose.y += poseStep.y || 0;
    pose.a += poseStep.a || 0;
    this.$mutate(PoseComponent)!(pose);
  }
}