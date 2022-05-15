import TranslationComponent from '../components/TranslationComponent';
import PoseComponent from '../components/PoseComponent';
import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

export default class TranslationSystem extends System {

  public once({ components }: { components: IComponentMaster }): void {
    components.forEvery(TranslationComponent)((translation) => {
      const delta = translation.copy();
      const pose = translation.$entity.$copy(PoseComponent)!;
      translation.$entity.$mutate(PoseComponent)({
        x: pose.x + delta.x,
        y: pose.y + delta.y,
        a: pose.a + delta.a,
      });
    });
  }
}
