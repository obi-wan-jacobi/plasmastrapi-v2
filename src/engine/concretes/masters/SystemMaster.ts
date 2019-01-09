import { Ctor } from '../../../framework/types/Ctor';
import Engine from '../../abstracts/Engine';
import IIterable from '../../../framework/interfaces/IIterable';
import IMaster from '../../interfaces/IMaster';
import ISystem from '../../interfaces/ISystem';
import TypeIndex from '../../../framework/concretes/data-structures/TypeIndex';

export default class SystemMaster implements IMaster<void>, IIterable<ISystem<any>> {

    private __engine: Engine;
    private __systems: TypeIndex<ISystem<any>>;
    private __systemsToAdd: Array<{ Ctor: Ctor<ISystem<any>, any>, arg: any }>;
    private __systemsToRemove: Array<{ Ctor: Ctor<ISystem<any>, any> }>;

    constructor(engine: Engine) {
        this.__engine = engine;
        this.__systemsToAdd = [];
        this.__systemsToRemove = [];
        this.__systems = new TypeIndex<ISystem<any>>();
    }

    public add<TSystem extends ISystem<any>>(
        SystemCtor: Ctor<TSystem, any>, arg?: any,
    ): SystemMaster {
        this.__systemsToAdd.push({ Ctor: SystemCtor, arg });
        return this;
    }

    public remove<TSystem extends ISystem<any>>(SystemCtor: Ctor<TSystem, any>): SystemMaster {
        this.__systemsToRemove.push({ Ctor: SystemCtor });
        return this;
    }

    public get<TSystem extends ISystem<any>>(SystemCtor: Ctor<TSystem, any>): TSystem {
        return this.__systems.get(SystemCtor);
    }

    public forEach(method: (system: ISystem<any>) => void): void {
        this.__systems.forEach(method);
    }

    public sync(): SystemMaster {
        this.__processSystemsToAdd();
        this.__processSystemsToRemove();
        return this;
    }

    private __processSystemsToAdd(): void {
        this.__systemsToAdd.forEach((system) => {
            this.__systems.add(system.Ctor, system.arg).bind(this.__engine);
        });
        this.__systemsToAdd = [];
    }

    private __processSystemsToRemove(): void {
        this.__systemsToRemove.forEach((system) => {
            this.__systems.remove(system.Ctor);
        });
        this.__systemsToRemove = [];
    }

}
