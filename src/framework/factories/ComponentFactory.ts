import IComponent from '../interfaces/IComponent';
import LinkedList from '../objects/LinkedList';

export default class ComponentFactory {

    private __collections: { [key: string]: LinkedList<IComponent<any>> };
    private __componentSubclassToSystemMap: { [key: string]: string };

    constructor(componentSubclassToSystemMap: { [key: string]: string }) {
        this.__collections = {};
        this.__componentSubclassToSystemMap = componentSubclassToSystemMap;
    }

    public create(ComponentSubclass: new() => IComponent<any>, data: any): IComponent<any> {
        const component = new ComponentSubclass();
        component.set(data);
        const systemName = this.__componentSubclassToSystemMap[ComponentSubclass.name];
        this.getCollection(systemName).push(component);
        return component;
    }

    public getCollection(componentSubclassName: string): LinkedList<IComponent<any>> {
        if (!this.__collections[componentSubclassName]) {
            this.__collections[componentSubclassName] = new LinkedList<IComponent<any>>();
        }
        return this.__collections[componentSubclassName];
    }

}
