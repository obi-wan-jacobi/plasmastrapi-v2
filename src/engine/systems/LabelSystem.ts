import { System } from '../abstracts/System';
import { LabelComponent, PoseComponent } from '../components';

export default class LabelSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(LabelComponent)((label) => {
            this.$engine.viewport.drawLabel({
                pose: label.$entity.$copy(PoseComponent),
                label: label.$entity.$copy(LabelComponent),
            });
        });
    }
}
