import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import PoseComponent from 'bootstrap/geometry/components/PoseComponent';
import AnimationComponent, { IAnimation } from '../components/AnimationComponent';

export default class AnimationSystem extends System<any> {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
      components.forEvery(AnimationComponent)((animation) => {
          const pose = animation.$entity.$copy(PoseComponent);
          if (!pose) {
              return;
          }
          const animationData = animation.copy() as (IAnimation & { idur?: number });
          if (animationData.idur === undefined) {
              animationData.idur = 0;
          }
          if (animationData.idur === animationData.duration) {
              animationData.idur = 0;
              if (animationData.isReversed) {
                  animationData.frame--;
              } else {
                  animationData.frame++;
              }
              if (animationData.frame > animationData.images.length - 1) {
                  animationData.frame = 0;
              }
              if (animationData.frame < 0) {
                  animationData.frame = animationData.images.length - 1;
              }
          } else if (!animationData.isPaused) {
              animationData.idur++;
          }
          animation.patch({ data: animation.copy() });
          viewport.drawImage({
              pose,
              image: animationData.images[animationData.frame],
          });
      });
  }
}