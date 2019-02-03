import CursorEventComponent from '../../engine/components/CursorEventComponent';
import CursorEventSystem from '../../engine/abstracts/systems/CursorEventSystem';

export default class GateCreationSystem extends CursorEventSystem {

    public once(component: CursorEventComponent): void {
        return;
    }

}
