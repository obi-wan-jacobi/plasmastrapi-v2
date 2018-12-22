import { Ctor } from '../types/Ctor';

export default abstract class System<TPayload extends {}> {

    /* tslint:disable:naming-convention */
    private __PayloadConstructor: Ctor<TPayload, any>;
    /* tslint:enable:naming-convention */

    constructor(PayloadSubclass: Ctor<TPayload, {}>) {
        this.__PayloadConstructor = PayloadSubclass;
    }

    /* tslint:disable:naming-convention */
    public get PayloadConstructor(): Ctor<TPayload, any> {
        return this.__PayloadConstructor;
    }
    /* tslint:enable:naming-convention */

    public abstract once(payload: TPayload): void;

}
