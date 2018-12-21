import FactoryMaster from './concretes/masters/FactoryMaster';
import IViewportAdapter from './interfaces/IViewportAdapter';
import StoreMaster from './concretes/masters/StoreMaster';
import SystemMaster from './concretes/masters/SystemMaster';

const ONE_SECOND_IN_MS = 1000.00;
const LOOPS_PER_SECOND = 60.0;
const MS_PER_LOOP_INTERVAL = ONE_SECOND_IN_MS / LOOPS_PER_SECOND;

export default class Engine<TViewportAdapter extends IViewportAdapter<any>> {

    private __viewport: TViewportAdapter;
    private __storeMaster: StoreMaster;
    private __factoryMaster: FactoryMaster;
    private __systemMaster: SystemMaster;
    private __isStopped: boolean;

    constructor(viewport: TViewportAdapter) {
        this.__viewport = viewport;
        this.__storeMaster = new StoreMaster();
        this.__factoryMaster = new FactoryMaster(this.__storeMaster);
        this.__systemMaster = new SystemMaster();
        this.__isStopped = true;
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

    public start(): void {
        this.__isStopped = false;
        this.__loop();
    }

    public stop(): void {
        this.__isStopped = true;
    }

    public once(): void {
        this.viewport.getRenderContext().refresh();
        this.viewport.storeInputs(this.store);
        this.systems.loopOnce(this.store);
        this.viewport.clearStoredInputs(this.store);
    }

    private __loop(): void {
        if (this.__isStopped) {
            return;
        }
        this.once();
        setTimeout(this.__loop.bind(this), MS_PER_LOOP_INTERVAL);
    }

}
