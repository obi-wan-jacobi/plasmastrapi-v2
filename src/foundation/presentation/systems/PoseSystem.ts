import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { getAbsolutePose } from 'foundation/helpers/entities';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

export default class PoseSystem extends System {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(PoseComponent)((pose) => {
      const { x, y } = getAbsolutePose(pose.$entity as IHTML5CanvasElement);
      viewport.drawCircle({
        position: { x, y },
        radius: 2,
        style: { fill: '', opacity: 1, zIndex: 9999, colour: 'GREEN' },
      });
    });
  }

}