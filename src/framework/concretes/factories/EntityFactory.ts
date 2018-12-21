import Entity from '../Entity';
import EntityStoreManager from '../store/EntityStoreManager';

export default class EntityFactory {

    private __entityStoreManager: EntityStoreManager;

    constructor(entityStoreManager: EntityStoreManager) {
        this.__entityStoreManager = entityStoreManager;
    }

    public create(): Entity {
        const entity = new Entity();
        this.__entityStoreManager.load(entity);
        return entity;
    }

}
