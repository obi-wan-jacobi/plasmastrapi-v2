import IInputAdapter from './interfaces/IInputAdapter';
import IViewportAdapter from './interfaces/IViewportAdapter';
import StoreMaster from './masters/StoreMaster';
import SystemLoopMaster from './masters/SystemLoopMaster';
import SystemMaster from './masters/SystemMaster';

export default class Engine {

    public readonly viewport: IViewportAdapter<any, any>;
    public readonly cursor: IInputAdapter;
    public readonly store: StoreMaster;
    public readonly systems: SystemMaster;
    public readonly loop: SystemLoopMaster;

    constructor(viewport: IViewportAdapter<any, any>, cursor: IInputAdapter) {
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
    }

}
