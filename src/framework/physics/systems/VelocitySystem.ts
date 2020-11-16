import VelocityComponent from '../components/VelocityComponent';
import System from 'engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';

export default class VelocitySystem extends System {

    public once(): void {
        this.$engine.components.forEvery(VelocityComponent)((velocity) => {
            const v = velocity.copy();
            const pose = velocity.$entity.$copy(PoseComponent);
            const dt = this.$engine.delta;
            velocity.$entity.$mutate(PoseComponent)({
                x: pose.x + v.x * dt,
                y: pose.y + v.y * dt,
                a: pose.a + v.w * dt,
            });
        });
    }
}
