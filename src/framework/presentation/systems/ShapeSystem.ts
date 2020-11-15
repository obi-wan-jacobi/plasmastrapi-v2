import StyleComponent from '../components/StyleComponent';
import System from '../../../engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';
import ShapeComponent from 'framework/geometry/components/ShapeComponent';
import { transformShape } from '../../helpers/geometry';

export default class ShapeSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ShapeComponent)((shape) => {
            const pose = shape.$entity.$copy(PoseComponent);
            this.$engine.viewport.drawShape({
                path  : transformShape(shape.copy(), pose).points,
                style : shape.$entity.$copy(StyleComponent),
            });
        });
    }
}
