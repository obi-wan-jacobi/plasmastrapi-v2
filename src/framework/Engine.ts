import ComponentCacheManager from './cache/ComponentCacheManager';
import ComponentFactory from './factories/ComponentFactory';
import Dictionary from './objects/Dictionary';
import EntityCacheManager from './cache/EntityCacheManager';
import IComponent from './interfaces/IComponent';
import Invocable from './abstracts/Invocable';
import RenderSystem from './abstracts/RenderSystem';
import System from './abstracts/System';

export default class Engine extends Invocable<void> {

    private __componentFactory: ComponentFactory;
    private __systemsDictionary: Dictionary<System<IComponent<any>>>;
    private __renderSystemsDictionary: Dictionary<RenderSystem<IComponent<any>>>;
    private __componentCacheManager: ComponentCacheManager;
    private __entityCacheManager: EntityCacheManager;

    constructor(componentSubclassToSystemMap: Dictionary<string>) {
        super({ method: () => { this.__invokeOnceForEach(); } });
        this.__componentFactory = new ComponentFactory(this);
        this.__systemsDictionary = new Dictionary<System<IComponent<any>>>();
        this.__renderSystemsDictionary = new Dictionary<RenderSystem<IComponent<any>>>();
        this.__componentCacheManager = new ComponentCacheManager();
        this.__entityCacheManager = new EntityCacheManager(this.__componentCacheManager);
    }

    get componentFactory(): ComponentFactory {
        return this.__componentFactory;
    }

    get componentCacheManager(): ComponentCacheManager {
        return this.__componentCacheManager;
    }

    get entityCacheManager(): EntityCacheManager {
        return this.__entityCacheManager;
    }

    public add(system: System<IComponent<any>>): void {
        ((system instanceof RenderSystem)
            ? this.__renderSystemsDictionary
            : this.__systemsDictionary
        ).write({
            key: system.constructor.name,
            value: system,
        });
    }

    private __invokeOnceForEach(): void {
        Object.keys(this.__systemsDictionary).forEach((key) => {
            this.__componentCacheManager.getCollection(key).forEach((component) => {
                this.__systemsDictionary.read(key).once(component);
            });
        });
        Object.keys(this.__renderSystemsDictionary).forEach((key) => {
            this.__componentCacheManager.getCollection(key).forEach((component) => {
                this.__renderSystemsDictionary.read(key).once(component);
            });
        });
    }

}
