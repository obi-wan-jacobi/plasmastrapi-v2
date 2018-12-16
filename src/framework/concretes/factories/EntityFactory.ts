import Entity from '../Entity';
import EntityCacheManager from '../cache/EntityCacheManager';

export default class EntityFactory {

    private __entityCacheManager: EntityCacheManager;

    constructor(entityCacheManager: EntityCacheManager) {
        this.__entityCacheManager = entityCacheManager;
    }

    public create(): Entity {
        const entity = new Entity();
        this.__entityCacheManager.load(entity);
        return entity;
    }

}
