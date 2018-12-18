import CacheMaster from './concretes/masters/CacheMaster';
import FactoryMaster from './concretes/masters/FactoryMaster';
import IComponent from './interfaces/IComponent';
import IViewportAdapter from './interfaces/IViewportAdapter';
import SystemMaster from './concretes/masters/SystemMaster';

const ONE_SECOND_IN_MS = 1000.00;
const LOOPS_PER_SECOND = 60.0;
const MS_PER_LOOP_INTERVAL = ONE_SECOND_IN_MS / LOOPS_PER_SECOND;

export default class Engine<TViewportAdapter extends IViewportAdapter<IComponent<any>>> {

    private __viewport: TViewportAdapter;
    private __cacheMaster: CacheMaster;
    private __factoryMaster: FactoryMaster;
    private __systemMaster: SystemMaster;
    private __isStopped: boolean;

    constructor(viewport: TViewportAdapter) {
        this.__viewport = viewport;
        this.__cacheMaster = new CacheMaster();
        this.__factoryMaster = new FactoryMaster(this);
        this.__systemMaster = new SystemMaster(this);
        this.__isStopped = true;
        this.__initViewport();
    }

    public get viewport(): TViewportAdapter {
        return this.__viewport;
    }

    public get cache(): CacheMaster {
        return this.__cacheMaster;
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

    private __initViewport(): void {
        this.__viewport.bind(this);
    }

    private __loop(): void {
        if (this.__isStopped) {
            return;
        }
        this.systems.loopOnce();
        setTimeout(this.__loop.bind(this), MS_PER_LOOP_INTERVAL);
    }

}
