import PoseComponent from 'foundation/geometry/components/PoseComponent';
import Constraint from './Constraint';

export default class XAxisConstraint extends Constraint {

  public invoke(): void {
    if (!this.$parent || !this.$parent.$parent) {
      throw new Error(`${this.constructor.name} has no parent!`);
    }
    const parentParentPose = this.$parent.$parent.$copy(PoseComponent)!;
    this.$parent.$patch(PoseComponent, {
      x: parentParentPose.x,
    });
  }

}