import { Ctor } from '../../types/Ctor';
import IRenderContext from '../../interfaces/IRenderContext';
import System from '../../abstracts/System';
import TypeCollection from '../data-structures/TypeCollection';

export default class SystemMaster {

    private __renderContext: IRenderContext<any>;
    private __systems: TypeCollection<System<any>>;

    constructor(renderContext: IRenderContext<any>) {
        this.__renderContext = renderContext;
        this.__systems = new TypeCollection<System<any>>();
    }

    public add<TSystem extends System<any>, TArg extends any>(
        SystemCtor: Ctor<TSystem, TArg>, arg: TArg
    ): TSystem {
        const system = new SystemCtor(arg);
        this.__systems.add(system);
        return system;
    }

    public get<TSystem extends System<any>>(SystemCtor: Ctor<TSystem, any>): TSystem {
        return this.__systems.get(SystemCtor);
    }

    public forEach(method: (system: System<any>) => void): void {
        this.__systems.forEach(method);
    }

}
