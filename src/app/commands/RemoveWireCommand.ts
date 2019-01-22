import Command from '../../framework/invocables/Command';
import Wire from '../entities/circuit-elements/Wire';

export default class RemoveWireCommand extends Command<void, void> {

    constructor(wire: Wire) {
        super({ method: () => { wire.unload(); } });
    }

}
