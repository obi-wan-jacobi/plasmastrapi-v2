import AnimatedImageComponent from '../components/AnimationComponent';
import System from '../../../engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';

export default class AnimatedImageSystem extends System {

  public draw(): void {
    this.$engine.components.forEvery(AnimatedImageComponent)((animation) => {
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
      animation.mutate(data);
      this.$engine.viewport.drawImage({
        pose: animation.$entity.$copy(PoseComponent) || { x: 0, y: 0, a: 0 },
        image: data.images[data.frame],
      });
    });
  }
}
