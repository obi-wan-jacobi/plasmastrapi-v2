import Dictionary from '../framework/concretes/Dictionary';
import Factory from '../framework/concretes/Factory';
import IComponent from './interfaces/IComponent';
import IComponentFactory from './interfaces/IComponentFactory';
import IDictionary from '../framework/interfaces/IDictionary';
import IFactory from '../framework/interfaces/IFactory';
import Wrapper from '../framework/abstracts/Wrapper';
import { Ctor } from '../framework/types';

export default class ComponentFactory extends Wrapper<IDictionary<IFactory<IComponent<any>>>>
implements IComponentFactory {

    constructor() {
        super(new Dictionary());
    }

    public create<T>(ComponentCtor: Ctor<IComponent<T>, T>, arg?: T): IComponent<T> {
        let factory = this.unwrap().read(ComponentCtor.name);
        if (!factory) {
            factory = new Factory();
            this.unwrap().write({
                key: ComponentCtor.name,
                value: factory,
            });
        }
        return factory.create(ComponentCtor, arg);
    }

    public destroy(component: IComponent<any>): void {
        return this.unwrap().read(component.constructor.name).destroy(component);
    }

    public forEvery<TArg>(ComponentCtor: Ctor<IComponent<TArg>, TArg>):
    (fn: (component: IComponent<TArg>) => void) => void {
        const collection = this.unwrap().read(ComponentCtor.name);
        return collection ? collection.forEach.bind(collection) : function(): void { return; };
    }

}
