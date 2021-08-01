import TranslationComponent from '../components/TranslationComponent';
import PoseComponent from '../components/PoseComponent';
import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

export default class TranslationSystem extends System<any> {

  public once({ components }: { components: IComponentMaster }): void {
    components.forEvery(TranslationComponent)((translation) => {
      const dp = translation.copy();
      const pose = translation.$entity.$copy(PoseComponent)!;
      translation.$entity.$mutate(PoseComponent)({
        x: pose.x + dp.x,
        y: pose.y + dp.y,
        a: pose.a + dp.a,
      });
    });
  }
}
