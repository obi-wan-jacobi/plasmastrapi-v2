import Gate from '../entities/circuit-elements/Gate';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import StoreMaster from '../../engine/masters/StoreMaster';
import Command from '../../framework/invocables/Command';

export default class CreateGateCommand extends Command<IPosition2D, void> {

    constructor(store: StoreMaster) {
        super({ method: (payload: IPosition2D) => { store.entities.create(Gate, payload); } });
    }

    public invoke(payload: IPosition2D): void {
        super.invoke(payload);
    }

}
