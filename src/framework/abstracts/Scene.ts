import LinkedList from '../objects/LinkedList';
import Entity from './Entity';

export default class Scene {

    private __entities: LinkedList<Entity>;

    constructor() {
        this.__entities = new LinkedList<Entity>();
    }

    public load(): void {
        this.__entities.forEach((entity) => {
            entity.load();
        });
    }

    public unload(): void {
        this.__entities.forEach((entity) => {
            entity.unload();
        });
    }

}
