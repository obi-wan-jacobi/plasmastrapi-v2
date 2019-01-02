import { Ctor } from '../../../framework/types/Ctor';
import ISystem from '../../interfaces/ISystem';
import StoreMaster from './StoreMaster';
import TypeCollection from '../../../framework/concretes/data-structures/TypeCollection';

export default class SystemMaster {

    private __store: StoreMaster;
    private __systems: TypeCollection<ISystem<any>>;

    constructor(store: StoreMaster) {
        this.__store = store;
        this.__systems = new TypeCollection<ISystem<any>>();
    }

    public add<TSystem extends ISystem<any>>(
        SystemCtor: Ctor<TSystem, any>, arg?: any,
    ): TSystem {
        const system = this.__systems.add(SystemCtor, arg);
        system.bind(this.__store);
        return system;
    }

    public get<TSystem extends ISystem<any>>(SystemCtor: Ctor<TSystem, any>): TSystem {
        return this.__systems.get(SystemCtor);
    }

    public forEach(method: (system: ISystem<any>) => void): void {
        this.__systems.forEach(method);
    }

}
