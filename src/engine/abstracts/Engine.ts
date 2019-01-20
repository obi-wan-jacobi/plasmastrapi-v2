import DragSystem from '../concretes/systems/DragSystem';
import ICursorAdapter from '../interfaces/ICursorAdapter';
import IViewportAdapter from '../interfaces/IViewportAdapter';
import PoseRenderingSystem from '../concretes/systems/PoseRenderingSystem';
import ShapeRenderingSystem from '../concretes/systems/ShapeRenderingSystem';
import StoreMaster from '../concretes/masters/StoreMaster';
import SystemLoopMaster from '../concretes/masters/SystemLoopMaster';
import SystemMaster from '../concretes/masters/SystemMaster';
import TranslationSystem from '../concretes/systems/TranslationSystem';

export default abstract class Engine {

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
