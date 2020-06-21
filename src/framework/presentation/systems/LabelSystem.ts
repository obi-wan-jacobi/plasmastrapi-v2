import { LabelComponent } from '../components/LabelComponent';
import { System } from '../../../engine/abstracts/System';
import { PoseComponent } from 'src/framework/geometry/components/PoseComponent';

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
