import StyleComponent from '../components/StyleComponent';
import System from '../../../engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import ShapeComponent from 'framework/geometry/components/ShapeComponent';
import { transformShape } from '../../helpers/geometry';
import IViewport from 'engine/interfaces/IViewport';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

export default class ShapeSystem extends System<any> {

    public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
        components.forEvery(ShapeComponent)((shape) => {
            const pose = shape.$entity.$copy(PoseComponent);
            const style = shape.$entity.$copy(StyleComponent);
            if (!pose || !style) {
                return;
            }
            viewport.drawShape({
                path: transformShape(shape.copy(), pose).vertices,
                style,
            });
        });
    }
}
