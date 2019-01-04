import { Ctor } from '../../../framework/types/Ctor';
import ISystem from '../../interfaces/ISystem';
import StoreMaster from './StoreMaster';
import TypeCollection from '../../../framework/concretes/data-structures/TypeCollection';

export default class SystemMaster {

    private __store: StoreMaster;
    private __systems: TypeCollection<ISystem<any>>;
    private __systemsToAdd: Array<{ Ctor: Ctor<ISystem<any>, any>, arg: any }>;
    private __systemsToRemove: Array<{ Ctor: Ctor<ISystem<any>, any> }>;

    constructor(store: StoreMaster) {
        this.__store = store;
        this.__systemsToAdd = [];
        this.__systemsToRemove = [];
        this.__systems = new TypeCollection<ISystem<any>>();
    }

    public add<TSystem extends ISystem<any>>(
        SystemCtor: Ctor<TSystem, any>, arg?: any,
    ): void {
        this.__systemsToAdd.push({ Ctor: SystemCtor, arg });
    }

    public remove<TSystem extends ISystem<any>>(SystemCtor: Ctor<TSystem, any>): void {
        this.__systemsToRemove.push({ Ctor: SystemCtor });
    }

    public get<TSystem extends ISystem<any>>(SystemCtor: Ctor<TSystem, any>): TSystem {
        return this.__systems.get(SystemCtor);
    }

    public forEach(method: (system: ISystem<any>) => void): void {
        this.__systems.forEach(method);
    }

    public sync(): void {
        this.__processSystemsToAdd();
        this.__processSystemsToRemove();
    }

    private __processSystemsToAdd(): void {
        this.__systemsToAdd.forEach((system) => {
            this.__systems.add(system.Ctor, system.arg).bind(this.__store);
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
