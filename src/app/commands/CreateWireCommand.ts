import Command from '../../framework/invocables/Command';
import IStoreMaster from '../../engine/interfaces/IStoreMaster';
import InputTerminal from '../entities/circuit-elements/InputTerminal';
import OutputTerminal from '../entities/circuit-elements/OutputTerminal';
import Wire from '../entities/circuit-elements/Wire';

export default class CreateWireCommand extends Command<{ head: InputTerminal, tail: OutputTerminal}, void> {

    constructor(store: IStoreMaster) {
        super({ method: ({ head, tail }: { head: InputTerminal, tail: OutputTerminal}) => {
            store.entities.create(Wire, { head, tail });
        } });
    }

    public invoke({ head, tail }: { head: InputTerminal, tail: OutputTerminal}): void {
        super.invoke({ head, tail });
    }

}
