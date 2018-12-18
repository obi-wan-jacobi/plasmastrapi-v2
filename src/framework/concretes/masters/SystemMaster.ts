import Dictionary from '../data-structures/Dictionary';
import Engine from '../../Engine';
import IComponent from '../../interfaces/IComponent';
import IViewportAdapter from '../../interfaces/IViewportAdapter';
import RenderSystem from '../../abstracts/RenderSystem';
import System from '../../abstracts/System';

export default class SystemMaster {

    private __engine: Engine<IViewportAdapter<IComponent<any>>>;
    private __basicSystems: Dictionary<System<IComponent<any>>>;
    private __renderSystems: Dictionary<RenderSystem<IComponent<any>>>;

    constructor(engine: Engine<IViewportAdapter<IComponent<any>>>) {
        this.__engine = engine;
        this.__basicSystems = new Dictionary<System<IComponent<any>>>();
        this.__renderSystems = new Dictionary<RenderSystem<IComponent<any>>>();
    }

    public add(system: System<IComponent<any>>): void {
        ((system instanceof RenderSystem)
            ? this.__renderSystems
            : this.__basicSystems
        ).write({
            key: system.constructor.name,
            value: system,
        });
    }

    public loopOnce(): void {
        this.__loopOnceForEachSystem(this.__basicSystems);
        this.__loopOnceForEachSystem(this.__renderSystems);
    }

    private __loopOnceForEachSystem(systemsDictionary: Dictionary<System<IComponent<any>>>): void {
        systemsDictionary.forEach((system) => {
            this.__engine.cache.components.getCollection(system.id).forEach((component) => {
                system.once(component);
            });
        });
    }

}
