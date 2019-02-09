import Batch from '../../framework/invocables/Batch';
import Command from '../../framework/invocables/Command';
import Gate from '../entities/circuit-elements/Gate';
import IStoreMaster from '../../engine/interfaces/IStoreMaster';
import RemoveWireCommand from './RemoveWireCommand';
import Wire from '../entities/circuit-elements/Wire';

export default class RemoveGateCommand extends Command<Gate, void> {

    constructor(store: IStoreMaster) {
        super({ method: (gate: Gate) => {
            gate.unload();
            this.__removeAnyWiresConnectedToGate({ store, gate });
        } });
    }

    private __removeAnyWiresConnectedToGate({ store, gate }: { store: IStoreMaster, gate: Gate }): void {
        const batch = new Batch();
        store.entities.get(Wire).forEach((wire: Wire) => {
            if (wire.head === gate.input || wire.tail === gate.output) {
                batch.add(new RemoveWireCommand(wire));
            }
        });
        batch.invoke();
    }

}
