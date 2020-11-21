import IPoseIncrement from '../../interfaces/IPoseIncrement';
import PoseComponent, { IPose } from '../../../../framework/geometry/components/PoseComponent';
import UIEntity from 'app/ui/abstracts/UIEntity';
import IEntityTemplate from 'app/IEntityTemplate';

export default class MachinePart extends UIEntity {

  private __initialPose: IPose;

  public constructor(template: IEntityTemplate) {
    super(template);
    this.__initialPose = this.$copy(PoseComponent);
  }

  public reset(): void {
    this.$mutate(PoseComponent)(this.__initialPose);
  }

  public step(poseStep: IPoseIncrement): void {
    const pose = this.$copy(PoseComponent);
    pose.x += poseStep.x || 0;
    pose.y += poseStep.y || 0;
    pose.a += poseStep.a || 0;
    this.$mutate(PoseComponent)(pose);
  }
}
