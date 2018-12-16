import CacheMaster from './concretes/masters/CacheMaster';
import FactoryMaster from './concretes/masters/FactoryMaster';
import SystemMaster from './concretes/masters/SystemMaster';

export default class Engine {

    private __cacheMaster: CacheMaster;
    private __factoryMaster: FactoryMaster;
    private __systemMaster: SystemMaster;

    constructor() {
        this.__cacheMaster = new CacheMaster();
        this.__factoryMaster = new FactoryMaster(this);
        this.__systemMaster = new SystemMaster(this);
    }

    public get cache(): CacheMaster {
        return this.__cacheMaster;
    }

    public get factory(): FactoryMaster {
        return this.__factoryMaster;
    }

    public get systems(): SystemMaster {
        return this.__systemMaster;
    }

}
