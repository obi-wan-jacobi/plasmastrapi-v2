import Dictionary from '../objects/Dictionary';
import IComponent from '../interfaces/IComponent';

export default class ComponentCacheManager {

    private __componentsMap: Dictionary<Dictionary<IComponent<any>>>;

    constructor() {
        this.__componentsMap = new Dictionary<Dictionary<IComponent<any>>>();
    }

    public load<T>(component: IComponent<T>): void {
        this.getCollection(component.constructor.name).write({
            key: component.id,
            value: component,
        });
    }

    public unload<T>(component: IComponent<T>): void {
        this.getCollection(component.constructor.name).delete(component.id);
    }

    public getCollection(componentSubclassName: string): Dictionary<IComponent<any>> {
        if (!this.__componentsMap.read(componentSubclassName)) {
            this.__componentsMap.write({
                key: componentSubclassName,
                value: new Dictionary<IComponent<any>>(),
            });
        }
        return this.__componentsMap.read(componentSubclassName);
    }

}
