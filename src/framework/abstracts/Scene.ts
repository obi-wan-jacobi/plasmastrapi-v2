import Engine from '../Engine';
import Entity from '../concretes/Entity';
import LinkedList from '../concretes/data-structures/LinkedList';

export default class Scene {

    private __engine: Engine;
    private __entities: LinkedList<Entity>;

    constructor(engine: Engine) {
        this.__engine = engine;
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
