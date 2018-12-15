import IComponent from './interfaces/IComponent';
import Invocable from './abstracts/Invocable';
import System from './abstracts/System';
import IRenderContext from './templates/IRenderContext';
import RenderSystem from './abstracts/RenderSystem';

export default class Engine extends Invocable<void> {

    private __renderSystems: { [key: string]: RenderSystem<IComponent<any>> };
    private __systems: { [key: string]: System<IComponent<any>> };

    constructor(renderContext: IRenderContext) {
        super({ method: () => { return; } });
        this.__renderSystems = {};
        this.__systems = {};
    }

    public add(system: System<IComponent<any>>): void {
        if (system instanceof RenderSystem) {
            this.__renderSystems[system.constructor.name] = system;
        } else {
            this.__systems[system.constructor.name] = system;
        }
    }

}
