import LabelComponent from '../components/LabelComponent';
import System from '../../../engine/abstracts/System';
import PoseComponent from 'framework/geometry/components/PoseComponent';

export default class LabelSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(LabelComponent)((label) => {
            if (!label.copy().text) {
                return;
            }
            this.$engine.viewport.drawLabel({
                pose: label.$entity.$copy(PoseComponent),
                label: label.copy(),
            });
        });
    }
}
