import IViewportAdapter from '../../interfaces/IViewportAdapter';
import StoreManager from '../../abstracts/StoreManager';
import StoreMaster from './StoreMaster';
import SystemMaster from './SystemMaster';

const ONE_SECOND_IN_MS = 1000.00;
const LOOPS_PER_SECOND = 60.0;
const MS_PER_LOOP_INTERVAL = ONE_SECOND_IN_MS / LOOPS_PER_SECOND;

export default class SystemLoopMaster {

    private __isStopped: boolean;
    private __viewport: IViewportAdapter<any>;
    private __store: StoreMaster;
    private __systems: SystemMaster;

    constructor(viewport: IViewportAdapter<any>, store: StoreMaster, systems: SystemMaster) {
        this.__viewport = viewport;
        this.__store = store;
        this.__systems = systems;
        this.__isStopped = true;
    }

    public start(): void {
        this.__isStopped = false;
        this.__loop();
    }

    public stop(): void {
        this.__isStopped = true;
    }

    public once(): void {
        this.__viewport.getRenderContext().refresh();
        this.__viewport.storeInputs(this.__store);
        this.__once(this.__store.components, this.__systems);
        this.__viewport.clearStoredInputs(this.__store);
    }

    private __once<TStoreManager extends StoreManager<any>>(
        store: TStoreManager, systems: SystemMaster
    ): void {
        systems.forEach((system) => {
            const collection = store.get(system.ComponentCtor);
            if (!collection) {
                return;
            }
            collection.forEach((component) => {
                system.once(component);
            });
        });
    }

    private __loop(): void {
        if (this.__isStopped) {
            return;
        }
        this.once();
        setTimeout(this.__loop.bind(this), MS_PER_LOOP_INTERVAL);
    }

}
