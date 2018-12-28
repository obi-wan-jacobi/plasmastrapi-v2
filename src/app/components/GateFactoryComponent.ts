import Component from '../../framework/abstracts/Component';
import { Ctor } from '../../framework/types/Ctor';
import Entity from '../../framework/concretes/Entity';

export default class GateFactoryComponent<TGate extends Entity>
extends Component<{
    GateCtor: Ctor<TGate, any>
}> {

    constructor(GateCtor: Ctor<TGate, any>) {
        super({ GateCtor });
    }

}
