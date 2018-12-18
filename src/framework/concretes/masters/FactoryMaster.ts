import ComponentFactory from '../factories/ComponentFactory';
import Engine from '../../Engine';
import EntityFactory from '../factories/EntityFactory';
import IComponent from '../../interfaces/IComponent';
import IViewportAdapter from '../../interfaces/IViewportAdapter';

export default class FactoryMaster {

    private __componentFactory: ComponentFactory;
    private __entityFactory: EntityFactory;

    constructor(engine: Engine<IViewportAdapter<IComponent<any>>>) {
        this.__componentFactory = new ComponentFactory(engine.cache.components);
        this.__entityFactory = new EntityFactory(engine.cache.entities);
    }

    get components(): ComponentFactory {
        return this.__componentFactory;
    }

    get entities(): EntityFactory {
        return this.__entityFactory;
    }

}
