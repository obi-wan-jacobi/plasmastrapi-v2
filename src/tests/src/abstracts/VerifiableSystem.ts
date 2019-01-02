import { Ctor } from '../../../framework/types/Ctor';
import IVerifiable from '../interfaces/IVerifiable';
import System from '../../../engine/abstracts/System';

export default abstract class VerifiableSystem<TComponent> extends System<TComponent> implements IVerifiable {

    private __isValid: boolean;

    constructor(ComponentCtor: Ctor<TComponent, any>) {
        super(ComponentCtor);
        this.__isValid = false;
    }

    public verify(): void {
        expect(this.__isValid).toBe(true);
    }

    public abstract once(component: TComponent): void;

    protected _validate(): void {
        this.__isValid = true;
    }

}
