import Dictionary from '../data-structures/Dictionary';
import Engine from '../../Engine';
import IComponent from '../../interfaces/IComponent';
import RenderSystem from '../../abstracts/RenderSystem';
import System from '../../abstracts/System';

export default class SystemMaster {

    private __engine: Engine;
    private __basicSystemsDictionary: Dictionary<System<IComponent<any>>>;
    private __renderSystemsDictionary: Dictionary<RenderSystem<IComponent<any>>>;

    constructor(engine: Engine) {
        this.__engine = engine;
        this.__basicSystemsDictionary = new Dictionary<System<IComponent<any>>>();
        this.__renderSystemsDictionary = new Dictionary<RenderSystem<IComponent<any>>>();
    }

    public add(system: System<IComponent<any>>): void {
        ((system instanceof RenderSystem)
            ? this.__renderSystemsDictionary
            : this.__basicSystemsDictionary
        ).write({
            key: system.constructor.name,
            value: system,
        });
    }

    public loopOnce(): void {
        this.__loopOnceForBasicSystems();
        this.__loopOnceForRenderSystems();
    }

    private __loopOnceForBasicSystems(): void {
        Object.keys(this.__basicSystemsDictionary).forEach((key) => {
            this.__engine.cache.components.getCollection(key).forEach((component) => {
                this.__basicSystemsDictionary.read(key).once(component);
            });
        });
    }

    private __loopOnceForRenderSystems(): void {
        Object.keys(this.__renderSystemsDictionary).forEach((key) => {
            this.__engine.cache.components.getCollection(key).forEach((component) => {
                this.__renderSystemsDictionary.read(key).once(component);
            });
        });
    }

}
