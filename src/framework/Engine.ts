import CacheMaster from './concretes/masters/CacheMaster';
import FactoryMaster from './concretes/masters/FactoryMaster';
import IComponent from './interfaces/IComponent';
import IViewportAdapter from './interfaces/IViewportAdapter';
import SystemMaster from './concretes/masters/SystemMaster';

export default class Engine<TViewportAdapter extends IViewportAdapter<IComponent<any>>> {

    private __viewport: TViewportAdapter;
    private __cacheMaster: CacheMaster;
    private __factoryMaster: FactoryMaster;
    private __systemMaster: SystemMaster;

    constructor(viewport: TViewportAdapter) {
        this.__viewport = viewport;
        this.__cacheMaster = new CacheMaster();
        this.__factoryMaster = new FactoryMaster(this);
        this.__systemMaster = new SystemMaster(this);
        this.__init();
    }

    public get viewport(): TViewportAdapter {
        return this.__viewport;
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

    private __init(): void {
        this.__viewport.bind(this);
    }

}
