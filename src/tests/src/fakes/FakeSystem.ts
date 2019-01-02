import IComponent from '../../../engine/interfaces/IComponent';
import VerifiableSystem from '../abstracts/VerifiableSystem';

export default class FakeSystem<TComponent extends IComponent<any>> extends VerifiableSystem<TComponent> {

    public once(component: TComponent): void {
        this._validate();
    }

}
