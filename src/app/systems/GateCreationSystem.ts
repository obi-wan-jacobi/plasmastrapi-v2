import MouseEventComponent from '../../engine/components/MouseEventComponent';
import MouseEventSystem from '../../engine/abstracts/systems/MouseEventSystem';

export default class GateCreationSystem extends MouseEventSystem {

    public once(component: MouseEventComponent): void {
        return;
    }

}
