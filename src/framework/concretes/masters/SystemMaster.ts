import { Ctor } from '../../types/Ctor';
import ISystem from '../../interfaces/ISystem';
import TypeCollection from '../data-structures/TypeCollection';

export default class SystemMaster {

    private __systems: TypeCollection<ISystem<any>>;

    constructor() {
        this.__systems = new TypeCollection<ISystem<any>>();
    }

    public add<TSystem extends ISystem<any>>(
        SystemCtor: Ctor<TSystem, any>, arg?: any
    ): TSystem {
        const system = new SystemCtor(arg);
        this.__systems.add(system);
        return system;
    }

    public get<TSystem extends ISystem<any>>(SystemCtor: Ctor<TSystem, any>): TSystem {
        return this.__systems.get(SystemCtor);
    }

    public forEach(method: (system: ISystem<any>) => void): void {
        this.__systems.forEach(method);
    }

}
