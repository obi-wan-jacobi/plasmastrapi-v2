import { System } from '../abstracts/System';
import { PoseComponent, ShapeComponent, ShapeRenderingProfileComponent } from '../components';
import { transformShape } from '../geometry';

export default class ShapeSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ShapeRenderingProfileComponent)((rendering) => {
            const shape = rendering.$entity.$copy(ShapeComponent);
            const pose = rendering.$entity.$copy(PoseComponent);
            this.$engine.viewport.drawShape({
                shape: transformShape(shape, pose),
                rendering: rendering.copy(),
            });
        });
    }
}
