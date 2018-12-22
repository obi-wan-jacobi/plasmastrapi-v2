import ComponentStoreManager from './ComponentStoreManager';
import Entity from '../Entity';
import StoreManager from '../../abstracts/StoreManager';

export default class EntityStoreManager extends StoreManager<Entity> {

    private __componentsStoreManager: ComponentStoreManager;

    constructor(componentStoreManager: ComponentStoreManager) {
        super();
        this.__componentsStoreManager = componentStoreManager;
    }

    public load(entity: Entity): void {
        entity.components.forEach((component) => {
            this.__componentsStoreManager.load(component);
        });
        super.load(entity);
    }

    public unload(entity: Entity): void {
        entity.components.forEach((component) => {
            this.__componentsStoreManager.unload(component);
        });
        super.unload(entity);
    }

}
