import IComponent from './interfaces/IComponent';
import Invocable from './abstracts/Invocable';
import System from './abstracts/System';

export default class Engine extends Invocable<void> {

    private __systems: Array<System<IComponent>>;

    constructor() {
        super({ method: () => { return; } });
        this.__systems = [];
    }

    public add(system: System<IComponent>): void {
        this.__systems.push(system);
    }

}
