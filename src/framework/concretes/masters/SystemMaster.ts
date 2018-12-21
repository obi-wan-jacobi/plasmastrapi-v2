import Dictionary from '../data-structures/Dictionary';
import InputSystem from '../../abstracts/InputSystem';
import RenderSystem from '../../abstracts/rendering/RenderSystem';
import StoreMaster from './StoreMaster';
import System from '../../abstracts/System';

export default class SystemMaster {

    private __inputSystems: Dictionary<InputSystem<any>>;
    private __renderSystems: Dictionary<RenderSystem<any>>;

    constructor() {
        this.__inputSystems = new Dictionary<InputSystem<any>>();
        this.__renderSystems = new Dictionary<RenderSystem<any>>();
    }

    public getInputReceiver<TInputSystem extends InputSystem<any>>(SystemClass: new () => TInputSystem): TInputSystem {
        return this.__inputSystems.read(SystemClass.name) as TInputSystem;
    }

    public addInputReceiver(system: InputSystem<any>): void {
        this.__inputSystems.write({
            key: system.constructor.name,
            value: system,
        });
    }

    public addRenderer(system: RenderSystem<any>): void {
        this.__renderSystems.write({
            key: system.constructor.name,
            value: system,
        });
    }

    public loopOnce(store: StoreMaster): void {
        this.__loopOnceForInputSystems(store);
        this.__loopOnceForRenderSystems(store);
    }

    private __loopOnceForInputSystems(store: StoreMaster): void {
        this.__loopOnceForEachSystem(store, this.__inputSystems);
    }

    private __loopOnceForRenderSystems(store: StoreMaster): void {
        this.__loopOnceForEachSystem(store, this.__renderSystems);
    }

    private __loopOnceForEachSystem<T>(store: StoreMaster, systemsDictionary: Dictionary<System<any>>): void {
        systemsDictionary.forEach((system) => {
            store.components.getCollection(system.id).forEach((component) => {
                system.once(component);
            });
        });
    }

}
