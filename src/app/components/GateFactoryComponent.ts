import Component from '../../framework/abstracts/Component';
import { Ctor } from '../../framework/types/Ctor';
import Entity from '../../framework/concretes/Entity';
import IPosition2D from '../../framework/interfaces/IPosition2D';

export default class GateFactoryComponent<TGate extends Entity>
extends Component<{
    GateCtor: Ctor<TGate, IPosition2D>,
}> {

    constructor({ GateCtor }: { GateCtor: Ctor<TGate, IPosition2D> }) {
        super({ GateCtor });
    }

}
