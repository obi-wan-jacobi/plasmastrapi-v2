import ComponentStoreManager from '../store/ComponentStoreManager';
import IComponent from '../../interfaces/IComponent';

export default class ComponentFactory {

    private __componentStoreManager: ComponentStoreManager;

    constructor(componentStoreManager: ComponentStoreManager) {
        this.__componentStoreManager = componentStoreManager;
    }

    public create<T extends {}>(ComponentSubclass: new(data: T) => IComponent<T>, data: T): IComponent<T> {
        const component = new ComponentSubclass(data);
        this.__componentStoreManager.load(component);
        return component;
    }

}
