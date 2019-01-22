import Command from '../../framework/invocables/Command';
import Gate from '../entities/circuit-elements/Gate';

export default class RemoveGateCommand extends Command<void, void> {

    constructor(gate: Gate) {
        super({ method: () => { gate.unload(); } });
    }

}
