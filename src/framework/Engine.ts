import HoverableSystem from './concretes/systems/HoverableSystem';
import ICursorAdapter from './interfaces/ICursorAdapter';
import IViewportAdapter from './interfaces/IViewportAdapter';
import RenderPoseSystem from './concretes/systems/RenderPoseSystem';
import RenderShapeSystem from './concretes/systems/RenderShapeSystem';
import StoreMaster from './concretes/masters/StoreMaster';
import SystemLoopMaster from './concretes/masters/SystemLoopMaster';
import SystemMaster from './concretes/masters/SystemMaster';
import TranslatableSystem from './concretes/systems/TranslatableSystem';

export default class Engine {

    private __viewport: IViewportAdapter<any, any>;
    private __cursor: ICursorAdapter;
    private __storeMaster: StoreMaster;
    private __systemMaster: SystemMaster;
    private __loopMaster: SystemLoopMaster;

    constructor(viewport: IViewportAdapter<any, any>, cursor: ICursorAdapter) {
        this.__viewport = viewport;
        this.__cursor = cursor;
        this.__storeMaster = new StoreMaster();
        this.__systemMaster = new SystemMaster();
        this.__loopMaster = new SystemLoopMaster(
            this.__viewport,
            this.__cursor,
            this.__storeMaster,
            this.__systemMaster
            );
        this.__initSystems();
    }

    public get viewport(): IViewportAdapter<any, any> {
        return this.__viewport;
    }

    public get cursor(): ICursorAdapter {
        return this.__cursor;
    }

    public get store(): StoreMaster {
        return this.__storeMaster;
    }

    public get systems(): SystemMaster {
        return this.__systemMaster;
    }

    public get loop(): SystemLoopMaster {
        return this.__loopMaster;
    }

    private __initSystems(): void {
        this.systems.add(TranslatableSystem);
        this.systems.add(HoverableSystem);
        this.systems.add(RenderPoseSystem, this.viewport);
        this.systems.add(RenderShapeSystem, this.viewport);
    }

}
