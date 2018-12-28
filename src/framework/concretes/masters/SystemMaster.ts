import { Ctor } from '../../types/Ctor';
import ISystem from '../../interfaces/ISystem';
import StoreMaster from './StoreMaster';
import TypeCollection from '../data-structures/TypeCollection';

export default class SystemMaster {

    private __store: StoreMaster;
    private __systems: TypeCollection<ISystem<any>>;

    constructor(store: StoreMaster) {
        this.__store = store;
        this.__systems = new TypeCollection<ISystem<any>>();
    }

    public add<TSystem extends ISystem<any>>(
        SystemCtor: Ctor<TSystem, any>, arg?: any
    ): TSystem {
        const system = new SystemCtor(arg);
        this.__systems.add(system);
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
