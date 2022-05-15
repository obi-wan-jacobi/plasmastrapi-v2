import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import PoseComponent from 'foundation/geometry/components/PoseComponent';

export default class PoseSystem extends System {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(PoseComponent)((pose) => {
      const { x, y } = pose.copy();
      viewport.drawCircle({
        position: { x, y },
        radius: 2,
        style: { fill: '', opacity: 1, zIndex: 9999, colour: 'GREEN' },
      });
    });
  }

}