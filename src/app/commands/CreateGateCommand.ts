import Command from '../../framework/invocables/Command';
import Gate from '../entities/circuit-elements/Gate';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import StoreMaster from '../../engine/masters/StoreMaster';

export default class CreateGateCommand extends Command<IPosition2D, Gate> {

    constructor(store: StoreMaster) {
        super({ method: (payload: IPosition2D): Gate => store.entities.create(Gate, payload) });
    }

    public invoke(payload: IPosition2D): Gate {
        return super.invoke(payload);
    }

}
