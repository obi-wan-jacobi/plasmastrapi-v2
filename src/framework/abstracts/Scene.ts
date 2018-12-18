import Engine from '../Engine';
import Entity from '../concretes/Entity';
import IComponent from '../interfaces/IComponent';
import IViewportAdapter from '../interfaces/IViewportAdapter';
import LinkedList from '../concretes/data-structures/LinkedList';

export default class Scene {

    private __engine: Engine<IViewportAdapter<IComponent<any>>>;
    private __entities: LinkedList<Entity>;

    constructor(engine: Engine<IViewportAdapter<IComponent<any>>>) {
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
