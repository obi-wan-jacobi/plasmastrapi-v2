import IMouseAdapter from './interfaces/IMouseAdapter';
import IStoreMaster from './interfaces/IStoreMaster';
import IViewportAdapter from './interfaces/IViewportAdapter';
import StoreMaster from './masters/StoreMaster';
import SystemLoopMaster from './masters/SystemLoopMaster';
import SystemMaster from './masters/SystemMaster';

export default class Engine {

    public readonly viewport: IViewportAdapter<any, any>;
    public readonly mouse: IMouseAdapter;
    public readonly store: IStoreMaster;
    public readonly systems: SystemMaster;
    public readonly loop: SystemLoopMaster;

    constructor(viewport: IViewportAdapter<any, any>, mouse: IMouseAdapter) {
        this.viewport = viewport;
        this.mouse = mouse;
        this.store = new StoreMaster();
        this.systems = new SystemMaster(this);
        this.loop = new SystemLoopMaster(
            this.viewport,
            this.mouse,
            this.store,
            this.systems,
        );
    }

}
