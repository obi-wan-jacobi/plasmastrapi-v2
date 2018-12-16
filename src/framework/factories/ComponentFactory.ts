import ComponentCacheManager from '../cache/ComponentCacheManager';
import IComponent from '../interfaces/IComponent';

export default class ComponentFactory {

    private __componentCacheManager: ComponentCacheManager;

    constructor(componentCacheManager: ComponentCacheManager) {
        this.__componentCacheManager = componentCacheManager;
    }

    public create(ComponentSubclass: new() => IComponent<any>, data: any): IComponent<any> {
        const component = new ComponentSubclass();
        component.set(data);
        this.__componentCacheManager.load(component);
        return component;
    }

}
