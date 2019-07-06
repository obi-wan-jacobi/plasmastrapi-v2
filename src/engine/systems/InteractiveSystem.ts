import { System } from '../abstracts/System';
import { Interactive } from '../entities';

export class InteractiveSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Interactive)((target) => {
            target.$once();
        });
    }
}
