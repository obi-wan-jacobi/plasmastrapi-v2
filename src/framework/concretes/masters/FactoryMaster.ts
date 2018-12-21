import ComponentFactory from '../factories/ComponentFactory';
import EntityFactory from '../factories/EntityFactory';
import StoreMaster from './StoreMaster';

export default class FactoryMaster {

    private __componentFactory: ComponentFactory;
    private __entityFactory: EntityFactory;

    constructor(store: StoreMaster) {
        this.__componentFactory = new ComponentFactory(store.components);
        this.__entityFactory = new EntityFactory(store.entities);
    }

    get components(): ComponentFactory {
        return this.__componentFactory;
    }

    get entities(): EntityFactory {
        return this.__entityFactory;
    }

}
