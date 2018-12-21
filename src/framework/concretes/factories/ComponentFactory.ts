import ComponentStoreManager from '../store/ComponentStoreManager';
import IComponent from '../../interfaces/IComponent';

export default class ComponentFactory {

    private __componentStoreManager: ComponentStoreManager;

    constructor(componentStoreManager: ComponentStoreManager) {
        this.__componentStoreManager = componentStoreManager;
    }

    public create<TComponent extends IComponent<{}>>(
        ComponentSubclass: new(data: {}) => TComponent, data: {}
    ): IComponent<TComponent> {
        const component = new ComponentSubclass(data);
        this.__componentStoreManager.load(component);
        return component;
    }

}
