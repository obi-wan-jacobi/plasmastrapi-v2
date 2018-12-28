import System from '../../framework/abstracts/System';
import WireComponent from '../components/WireComponent';

export default class WireSystem extends System<WireComponent> {

    constructor() {
        super(WireComponent);
    }

    public once(component: WireComponent): void {
        return;
    }

}
