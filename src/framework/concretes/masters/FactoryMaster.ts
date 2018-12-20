import CacheMaster from './CacheMaster';
import ComponentFactory from '../factories/ComponentFactory';
import EntityFactory from '../factories/EntityFactory';

export default class FactoryMaster {

    private __componentFactory: ComponentFactory;
    private __entityFactory: EntityFactory;

    constructor(cache: CacheMaster) {
        this.__componentFactory = new ComponentFactory(cache.components);
        this.__entityFactory = new EntityFactory(cache.entities);
    }

    get components(): ComponentFactory {
        return this.__componentFactory;
    }

    get entities(): EntityFactory {
        return this.__entityFactory;
    }

}
