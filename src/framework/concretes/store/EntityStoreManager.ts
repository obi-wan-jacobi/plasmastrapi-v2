import ComponentStoreManager from './ComponentStoreManager';
import Entity from '../Entity';

export default class EntityStoreManager {

    private __componentsStoreManager: ComponentStoreManager;

    constructor(componentStoreManager: ComponentStoreManager) {
        this.__componentsStoreManager = componentStoreManager;
    }

    public load(entity: Entity): void {
        entity.forEach((component) => {
            this.__componentsStoreManager.load(component);
        });
    }

    public unload(entity: Entity): void {
        entity.forEach((component) => {
            this.__componentsStoreManager.unload(component);
        });
    }

}
