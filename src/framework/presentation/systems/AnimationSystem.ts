import { AnimationComponent } from '../components/AnimationComponent';
import { System } from '../../../engine/abstracts/System';
import { PoseComponent } from 'src/framework/geometry/components/PoseComponent';

export default class AnimatedImageSystem extends System {

  public draw(): void {
    this.$engine.components.forEvery(AnimationComponent)((animation) => {
      const data = animation.copy();
      if (data.cooldown === data.speed) {
        data.cooldown = 0;
        if (data.isReversed) {
          data.frame--;
        } else {
          data.frame++;
        }
        if (data.frame > data.images.length - 1) {
          data.frame = 0;
        }
        if (data.frame < 0) {
          data.frame = data.images.length - 1;
        }
      } else if (!data.isPaused) {
        data.cooldown++;
      }
      animation.$entity.$mutate(AnimationComponent)(data);
      this.$engine.viewport.drawImage({
        pose: animation.$entity.$copy(PoseComponent),
        image: data.images[data.frame],
      });
    });
  }
}
