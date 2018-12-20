import Entity from '../concretes/Entity';
import LinkedList from '../concretes/data-structures/LinkedList';
import Unique from './Unique';

export default class Scene extends Unique {

    private __entities: LinkedList<Entity>;

    constructor() {
        super();
        this.__entities = new LinkedList<Entity>();
    }

    public load(): void {
        return;
    }

    public unload(): void {
        return;
    }

}
