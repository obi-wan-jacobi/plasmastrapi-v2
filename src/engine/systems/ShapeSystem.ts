import { System } from '../abstracts/System';
import { Pose, Shape, ShapeRenderingProfile } from '../components';
import { transformShape } from '../geometry';

export default class ShapeSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(ShapeRenderingProfile)((rendering) => {
            const shape = rendering.$entity.$copy(Shape);
            const pose = rendering.$entity.$copy(Pose);
            this.$engine.viewport.drawShape({
                shape: transformShape(shape, pose),
                rendering: rendering.copy(),
            });
        });
    }
}
