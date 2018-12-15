import IComponent from './interfaces/IComponent';
import Invocable from './abstracts/Invocable';
import System from './abstracts/System';

export default class Engine extends Invocable<void> {

    private __systems: Array<System<IComponent<any>>>;

    constructor() {
        super({ method: () => { return; } });
        this.__systems = [];
    }

    public add(system: System<IComponent<any>>): void {
        this.__systems.push(system);
    }

}
