import CacheMaster from './CacheMaster';
import Dictionary from '../data-structures/Dictionary';
import IComponent from '../../interfaces/IComponent';
import IViewportAdapter from '../../interfaces/IViewportAdapter';
import RenderSystem from '../../abstracts/RenderSystem';
import System from '../../abstracts/System';

export default class SystemMaster<TViewportAdapter extends IViewportAdapter<IComponent<any>>> {

    private __basicSystems: Dictionary<System<IComponent<any>>>;
    private __renderSystems: Dictionary<RenderSystem<IComponent<any>>>;

    constructor() {
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

    public loopOnce(viewport: TViewportAdapter, cache: CacheMaster): void {
        this.__loopOnceForBasicSystems(cache);
        this.__loopOnceForRenderSystems(viewport, cache);
    }

    private __loopOnceForBasicSystems(cache: CacheMaster): void {
        this.__loopOnceForEachSystem(cache, this.__basicSystems);
    }

    private __loopOnceForRenderSystems(viewport: TViewportAdapter, cache: CacheMaster): void {
        viewport.getRenderContext().refresh();
        this.__loopOnceForEachSystem(cache, this.__renderSystems);
    }

    private __loopOnceForEachSystem(cache: CacheMaster, systemsDictionary: Dictionary<System<IComponent<any>>>): void {
        systemsDictionary.forEach((system) => {
            cache.components.getCollection(system.id).forEach((component) => {
                system.once(component);
            });
        });
    }

}
