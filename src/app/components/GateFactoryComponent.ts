import Component from '../../engine/abstracts/Component';
import { Ctor } from '../../framework/types/Ctor';
import Entity from '../../engine/concretes/Entity';
import IPosition2D from '../../geometry/interfaces/IPosition2D';

export default class GateFactoryComponent<TGate extends Entity>
extends Component<{
    GateCtor: Ctor<TGate, IPosition2D>,
}> {

    constructor({ GateCtor }: { GateCtor: Ctor<TGate, IPosition2D> }) {
        super({ GateCtor });
    }

}
