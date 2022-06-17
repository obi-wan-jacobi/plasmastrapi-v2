import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import RelativePoseComponent from 'foundation/geometry/components/RelativePoseComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class RelativePoseSystem extends System {

  public once({ components }: { components: IComponentMaster }): void {
    components.forEvery(RelativePoseComponent)(((component) => {
      const parentPose = (component.$entity as HTML5CanvasElement).$parent?.$copy(PoseComponent);
      const relativePose = component.copy();
      if (parentPose) {
        component.$entity.$patch(PoseComponent, {
          x: parentPose.x + relativePose.x,
          y: parentPose.y + relativePose.y,
          a: parentPose.a + relativePose.a,
        });
      }
    }));
  }

}