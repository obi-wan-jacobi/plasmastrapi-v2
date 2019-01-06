import { Ctor } from '../../framework/types/Ctor';
import Engine from '../Engine';
import ISlave from '../../framework/interfaces/ISlave';
import ISystem from '../interfaces/ISystem';
import StoreMaster from '../concretes/masters/StoreMaster';
import SystemMaster from '../concretes/masters/SystemMaster';

export default abstract class System<TComponent extends {}> implements ISystem<TComponent>, ISlave<SystemMaster> {

    /* tslint:disable:naming-convention */
    public readonly ComponentCtor: Ctor<TComponent, any>;
    /* tslint:enable:naming-convention */
    private __store: StoreMaster;
    private __master: SystemMaster;

    constructor(ComponentCtor: Ctor<TComponent, {}>) {
        this.ComponentCtor = ComponentCtor;
    }

    public get store(): StoreMaster {
        return this.__store;
    }

    public get master(): SystemMaster {
        return this.__master;
    }

    public bind(engine: Engine): void {
        this.__store = engine.store;
        this.__master = engine.systems;
    }

    public abstract once(payload: TComponent): void;

}
