import Entity from '../Entity';
import ComponentCacheManager from './ComponentCacheManager';

export default class EntityCacheManager {

    private __componentsCacheManager: ComponentCacheManager;

    constructor(componentCacheManager: ComponentCacheManager) {
        this.__componentsCacheManager = componentCacheManager;
    }

    public load(entity: Entity): void {
        entity.forEach((component) => {
            this.__componentsCacheManager.load(component);
        });
    }

    public unload(entity: Entity): void {
        entity.forEach((component) => {
            this.__componentsCacheManager.unload(component);
        });
    }

}
