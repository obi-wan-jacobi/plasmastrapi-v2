import FactoryMaster from './concretes/masters/FactoryMaster';
import IViewportAdapter from './interfaces/IViewportAdapter';
import StoreMaster from './concretes/masters/StoreMaster';
import SystemLoopMaster from './concretes/masters/SystemLoopMaster';
import SystemMaster from './concretes/masters/SystemMaster';

export default class Engine<TViewportAdapter extends IViewportAdapter<any>> {

    private __viewport: TViewportAdapter;
    private __storeMaster: StoreMaster;
    private __factoryMaster: FactoryMaster;
    private __systemMaster: SystemMaster;
    private __loopMaster: SystemLoopMaster;

    constructor(viewport: TViewportAdapter) {
        this.__viewport = viewport;
        this.__storeMaster = new StoreMaster();
        this.__factoryMaster = new FactoryMaster(this.__storeMaster);
        this.__systemMaster = new SystemMaster(this.viewport.getRenderContext());
        this.__loopMaster = new SystemLoopMaster(
            this.__viewport,
            this.__storeMaster,
            this.__systemMaster
        );
    }

    public get viewport(): TViewportAdapter {
        return this.__viewport;
    }

    public get store(): StoreMaster {
        return this.__storeMaster;
    }

    public get factory(): FactoryMaster {
        return this.__factoryMaster;
    }

    public get systems(): SystemMaster {
        return this.__systemMaster;
    }

    public get loop(): SystemLoopMaster {
        return this.__loopMaster;
    }

}
