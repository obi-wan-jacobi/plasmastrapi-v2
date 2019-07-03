import IComponent from '../interfaces/IComponent';
import { System } from '../abstracts/System';
import { ILabel, Label, Pose } from '../components';

export default class LabelSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(Label)((label: IComponent<ILabel>) => {
            this.$engine.viewport.drawLabel({
                pose: label.$entity.copy(Pose),
                label: label.$entity.copy(Label),
            });
        });
    }
}
