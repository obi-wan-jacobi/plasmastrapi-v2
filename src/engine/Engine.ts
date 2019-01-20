import DragSystem from '../app/systems/DragSystem';
import ICursorAdapter from './interfaces/ICursorAdapter';
import IViewportAdapter from './interfaces/IViewportAdapter';
import PoseRenderingSystem from './systems/PoseRenderingSystem';
import ShapeRenderingSystem from './systems/ShapeRenderingSystem';
import StoreMaster from './masters/StoreMaster';
import SystemLoopMaster from './masters/SystemLoopMaster';
import SystemMaster from './masters/SystemMaster';
import TranslationSystem from '../app/systems/TranslationSystem';

export default class Engine {

    public readonly viewport: IViewportAdapter<any, any>;
    public readonly cursor: ICursorAdapter;
    public readonly store: StoreMaster;
    public readonly systems: SystemMaster;
    public readonly loop: SystemLoopMaster;

    constructor(viewport: IViewportAdapter<any, any>, cursor: ICursorAdapter) {
        this.viewport = viewport;
        this.cursor = cursor;
        this.store = new StoreMaster();
        this.systems = new SystemMaster(this);
        this.loop = new SystemLoopMaster(
            this.viewport,
            this.cursor,
            this.store,
            this.systems,
        );
        this.__initSystemsInPriorityOrder();
    }

    private __initSystemsInPriorityOrder(): void {
        this.systems.add(TranslationSystem);
        this.systems.add(DragSystem);
        this.systems.add(PoseRenderingSystem, this.viewport);
        this.systems.add(ShapeRenderingSystem, this.viewport);
    }

}
