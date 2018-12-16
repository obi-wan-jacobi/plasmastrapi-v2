import IComponent from './interfaces/IComponent';
import Invocable from './abstracts/Invocable';
import System from './abstracts/System';
import RenderSystem from './abstracts/RenderSystem';
import ComponentFactory from './factories/ComponentFactory';

export default class Engine extends Invocable<void> {

    private __componentFactory: ComponentFactory;
    private __systems: { [key: string]: System<IComponent<any>> };
    private __renderSystems: { [key: string]: RenderSystem<IComponent<any>> };

    constructor(componentSubclassToSystemMap: { [key: string]: string }) {
        super({ method: () => { this.__invokeOnceForEach(); } });
        this.__componentFactory = new ComponentFactory(componentSubclassToSystemMap);
        this.__systems = {};
        this.__renderSystems = {};
    }

    get componentFactory(): ComponentFactory {
        return this.__componentFactory;
    }

    public add(system: System<IComponent<any>>): void {
        if (system instanceof RenderSystem) {
            this.__renderSystems[system.constructor.name] = system;
        } else {
            this.__systems[system.constructor.name] = system;
        }
    }

    private __invokeOnceForEach(): void {
        Object.keys(this.__systems).forEach((key) => {
            this.__componentFactory.getCollection(key).forEach((component) => {
                this.__systems[key].once(component);
            });
        });
        Object.keys(this.__renderSystems).forEach((key) => {
            this.__componentFactory.getCollection(key).forEach((component) => {
                this.__renderSystems[key].once(component);
            });
        });
    }

}
