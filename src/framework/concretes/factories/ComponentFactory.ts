import ComponentCacheManager from '../cache/ComponentCacheManager';
import IComponent from '../../interfaces/IComponent';

export default class ComponentFactory {

    private __componentCacheManager: ComponentCacheManager;

    constructor(componentCacheManager: ComponentCacheManager) {
        this.__componentCacheManager = componentCacheManager;
    }

    public create<T extends {}>(ComponentSubclass: new(data: T) => IComponent<T>, data: T): IComponent<T> {
        const component = new ComponentSubclass(data);
        this.__componentCacheManager.load(component);
        return component;
    }

}
