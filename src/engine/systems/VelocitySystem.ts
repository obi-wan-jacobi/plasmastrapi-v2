import { System } from '../abstracts/System';
import { PoseComponent, VelocityComponent } from '../components';

export default class VelocitySystem extends System {

    public once(): void {
        this.$engine.components.forEvery(VelocityComponent)((velocity) => {
            const { x, y, w } = velocity.copy();
            const pose = velocity.$entity.$copy(PoseComponent);
            const dt = this.$engine.delta;
            velocity.$entity.$mutate(PoseComponent)({
                x: pose.x + x * dt,
                y: pose.y + y * dt,
                a: pose.a + w * dt,
            });
        });
    }
}
