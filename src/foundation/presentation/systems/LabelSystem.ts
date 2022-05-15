import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import LabelComponent from '../components/LabelComponent';
import StyleComponent from '../components/StyleComponent';

export default class LabelSystem extends System {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
      components.forEvery(LabelComponent)((label) => {
          const style = label.$entity.$copy(StyleComponent);
          const pose = label.$entity.$copy(PoseComponent);
          if (!style || !pose) {
              return;
          }
          viewport.drawLabel({
              pose,
              style,
              label: label.copy(),
          });
      });
  }
}