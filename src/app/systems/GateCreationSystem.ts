import InputComponent from '../../engine/components/InputComponent';
import InputSystem from '../../engine/abstracts/systems/InputSystem';

export default class GateCreationSystem extends InputSystem {

    public once(component: InputComponent): void {
        return;
    }

}
