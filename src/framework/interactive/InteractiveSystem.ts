import { InteractiveEntity } from './InteractiveEntity';
import { System } from '../../engine/abstracts/System';

export class InteractiveSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(InteractiveEntity)((target) => {
            target.$once();
        });
    }
}
