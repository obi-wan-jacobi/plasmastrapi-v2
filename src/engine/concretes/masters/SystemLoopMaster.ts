import BusMaster from './BusMaster';
import ICursorAdapter from '../../interfaces/ICursorAdapter';
import ILoopable from '../../interfaces/ILoopable';
import IMaster from '../../interfaces/IMaster';
import IViewportAdapter from '../../interfaces/IViewportAdapter';
import StoreMaster from './StoreMaster';
import SystemMaster from './SystemMaster';

const ONE_SECOND_IN_MS = 1000.00;
const LOOPS_PER_SECOND = 120.0;
const MS_PER_LOOP_INTERVAL = ONE_SECOND_IN_MS / LOOPS_PER_SECOND;

export default class SystemLoopMaster implements IMaster<void>, ILoopable<void> {

    private __isStopped: boolean;
    private __viewport: IViewportAdapter<any, any>;
    private __cursor: ICursorAdapter;
    private __store: StoreMaster;
    private __systems: SystemMaster;
    private __bus: BusMaster;

    constructor(
        viewport: IViewportAdapter<any, any>,
        cursor: ICursorAdapter,
        store: StoreMaster,
        systems: SystemMaster,
        bus: BusMaster,
    ) {
        this.__viewport = viewport;
        this.__cursor = cursor;
        this.__store = store;
        this.__systems = systems;
        this.__bus = bus;
        this.__isStopped = true;
    }

    public sync(): void {
        this.__systems.sync();
        this.__store.sync();
        this.__viewport.sync();
        this.__cursor.sync(this.__store.components);
        this.__bus.sync(this.__store.components);
    }

    public start(): void {
        this.__isStopped = false;
        this.__loop();
    }

    public stop(): void {
        this.__isStopped = true;
    }

    public once(): void {
        this.sync();
        this.__runComponentsThroughEachCorrespondingSystemOnce();
    }

    private __runComponentsThroughEachCorrespondingSystemOnce(): void {
        this.__systems.forEach((system) => {
            const collection = this.__store.components.get(system.ComponentCtor);
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
