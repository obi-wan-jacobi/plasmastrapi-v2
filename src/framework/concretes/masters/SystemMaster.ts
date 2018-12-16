import Dictionary from '../data-structures/Dictionary';
import Engine from '../../Engine';
import IComponent from '../../interfaces/IComponent';
import RenderSystem from '../../abstracts/RenderSystem';
import System from '../../abstracts/System';

export default class SystemMaster {

    private __engine: Engine;
    private __basicSystems: Dictionary<System<IComponent<any>>>;
    private __renderSystems: Dictionary<RenderSystem<IComponent<any>>>;

    constructor(engine: Engine) {
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
        console.log('loop once master');
        this.__loopOnceForEachSystem(this.__basicSystems);
        this.__loopOnceForEachSystem(this.__renderSystems);
    }

    private __loopOnceForEachSystem(systemsDictionary: Dictionary<System<IComponent<any>>>): void {
        console.log('render once');
        systemsDictionary.forEach((system) => {
            console.log('what is the system ' + system.constructor.name);
            this.__engine.cache.components.getCollection(system.id).forEach((component) => {
                system.once(component);
            });
        });
    }

}
