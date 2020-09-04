import { MotionComponent } from '../components/MotionComponent';
import { PoseComponent } from '../components/PoseComponent';
import { System } from '../../../engine/abstracts/System';

export default class MotionSystem extends System {

  public once(): void {
    this.$engine.components.forEvery(MotionComponent)((motion) => {
      const step = motion.copy();
      const pose = motion.$entity.$copy(PoseComponent);
      motion.$entity.$mutate(PoseComponent)({
        x: pose.x + step.x,
        y: pose.y + step.y,
        a: pose.a + step.a,
      });
    });
  }
}
