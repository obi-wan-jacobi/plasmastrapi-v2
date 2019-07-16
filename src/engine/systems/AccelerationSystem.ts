import { System } from '../abstracts/System';
import { AccelerationComponent, VelocityComponent } from '../components';

export default class AccelerationSystem extends System {

    public once(): void {
        this.$engine.components.forEvery(AccelerationComponent)((acceleration) => {
            const { x, y, w } = acceleration.copy();
            const velocity = acceleration.$entity.$copy(VelocityComponent);
            const dt = this.$engine.delta;
            acceleration.$entity.$mutate(VelocityComponent)({
                x: velocity.x + x * dt,
                y: velocity.y + y * dt,
                w: velocity.w + w * dt,
            });
        });
    }
}
