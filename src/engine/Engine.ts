import ChildPoseOffsetSystem from './concretes/systems/ChildPoseOffsetSystem';
import DragSystem from './concretes/systems/DragSystem';
import ICursorAdapter from './interfaces/ICursorAdapter';
import IViewportAdapter from './interfaces/IViewportAdapter';
import LineConnectorSystem from './concretes/systems/LineConnectorSystem';
import LineDrawingSystem from './concretes/systems/LineDrawingSystem';
import LineRenderingSystem from './concretes/systems/LineRenderingSystem';
import PoseRenderingSystem from './concretes/systems/PoseRenderingSystem';
import ShapeRenderingSystem from './concretes/systems/ShapeRenderingSystem';
import StoreMaster from './concretes/masters/StoreMaster';
import SystemLoopMaster from './concretes/masters/SystemLoopMaster';
import SystemMaster from './concretes/masters/SystemMaster';
import TranslationSystem from './concretes/systems/TranslationSystem';

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
        this.__systemMaster = new SystemMaster(this.__storeMaster);
        this.__loopMaster = new SystemLoopMaster(
            this.__viewport,
            this.__cursor,
            this.__storeMaster,
            this.__systemMaster,
            );
        this.__initSystemsInPriorityOrder();
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

    private __initSystemsInPriorityOrder(): void {
        this.systems.add(TranslationSystem);
        this.systems.add(ChildPoseOffsetSystem);
        this.systems.add(LineConnectorSystem);
        this.systems.add(DragSystem);
        this.systems.add(LineDrawingSystem);
        this.systems.add(LineRenderingSystem, this.viewport);
        this.systems.add(PoseRenderingSystem, this.viewport);
        this.systems.add(ShapeRenderingSystem, this.viewport);
    }

}
