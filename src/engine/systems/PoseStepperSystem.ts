import { System } from '../abstracts/System';
import { PoseComponent, PoseStepperComponent } from '../components';

export class PoseStepperSystem extends System {

    public once(): void {
        this.$engine.components.forEvery(PoseStepperComponent)((stepper) => {
            const step = stepper.copy();
            const pose = stepper.$entity.$copy(PoseComponent);
            stepper.$entity.$mutate(PoseComponent)({
                x: pose.x + step.x,
                y: pose.y + step.y,
                a: pose.a + step.a,
            });
        });
    }
}
