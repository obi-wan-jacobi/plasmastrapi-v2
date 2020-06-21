import { StyleComponent } from '../components/StyleComponent';
import { System } from '../../../engine/abstracts/System';
import { transformShape } from '../../helpers/geometry';
import { PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { ShapeComponent } from 'src/framework/geometry/components/ShapeComponent';

export default class ShapeSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ShapeComponent)((shape) => {
            const pose = shape.$entity.$copy(PoseComponent);
            this.$engine.viewport.drawShape({
                path: transformShape(shape.copy(), pose).points,
                styling: shape.$entity.$copy(StyleComponent),
            });
        });
    }
}
