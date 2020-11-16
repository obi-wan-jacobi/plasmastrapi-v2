import AccelerationComponent from '../components/AccelerationComponent';
import System from '../../../engine/abstracts/System';
import VelocityComponent from '../components/VelocityComponent';

export default class AccelerationSystem extends System {

    public once(): void {
        this.$engine.components.forEvery(AccelerationComponent)((acceleration) => {
            const a = acceleration.copy();
            const v = acceleration.$entity.$copy(VelocityComponent);
            const dt = this.$engine.delta;
            acceleration.$entity.$mutate(VelocityComponent)({
                x: v.x + a.x * dt,
                y: v.y + a.y * dt,
                w: v.w + a.w * dt,
            });
        });
    }
}
