import ComponentCacheManager from '../cache/ComponentCacheManager';
import EntityCacheManager from '../cache/EntityCacheManager';

export default class CacheMaster {

    private __componentCacheManager: ComponentCacheManager;
    private __entityCacheManager: EntityCacheManager;

    constructor() {
        this.__componentCacheManager = new ComponentCacheManager();
        this.__entityCacheManager = new EntityCacheManager(this.__componentCacheManager);
    }

    get components(): ComponentCacheManager {
        return this.__componentCacheManager;
    }

    get entities(): EntityCacheManager {
        return this.__entityCacheManager;
    }

}
