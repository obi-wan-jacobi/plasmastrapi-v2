import { Ctor } from '../../types/Ctor';

export default abstract class System<TComponent extends {}> {

    /* tslint:disable:naming-convention */
    private __ComponentCtor: Ctor<TComponent, any>;
    /* tslint:enable:naming-convention */

    constructor(ComponentCtor: Ctor<TComponent, {}>) {
        this.__ComponentCtor = ComponentCtor;
    }

    /* tslint:disable:naming-convention */
    public get ComponentCtor(): Ctor<TComponent, any> {
        return this.__ComponentCtor;
    }
    /* tslint:enable:naming-convention */

    public abstract once(payload: TComponent): void;

}
