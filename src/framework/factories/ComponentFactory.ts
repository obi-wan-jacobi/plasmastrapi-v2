import Engine from '../Engine';
import IComponent from '../interfaces/IComponent';

export default class ComponentFactory {

    private __engine: Engine;

    constructor(engine: Engine) {
        this.__engine = engine;
    }

    public create(ComponentSubclass: new() => IComponent<any>, data: any): IComponent<any> {
        const component = new ComponentSubclass();
        component.set(data);
        this.__engine.componentCacheManager.load(component);
        return component;
    }

}
