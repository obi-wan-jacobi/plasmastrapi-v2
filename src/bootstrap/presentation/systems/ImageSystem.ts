import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import PoseComponent from 'bootstrap/geometry/components/PoseComponent';
import ImageComponent from '../components/ImageComponent';

export default class ImageSystem extends System<any> {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
      components.forEvery(ImageComponent)((image) => {
          const pose = image.$entity.$copy(PoseComponent);
          if (!pose) {
              return;
          }
          viewport.drawImage({
              pose,
              image: image.copy(),
          });
     });
  }
}