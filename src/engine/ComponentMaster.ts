import IComponent from './interfaces/IComponent';
import IComponentMaster from './interfaces/IComponentMaster';
import IEntity from './interfaces/IEntity';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';
import { ComponentClass, Ctor } from './types';

export default class ComponentMaster implements IComponentMaster {

  private __componentMap: IDictionary<IDictionary<IComponent<any>>> = new Dictionary();

  public create<T extends IComponent<TArg>, TArg>(entity: IEntity, ComponentConstructor: Ctor<T, TArg>, data: TArg): T {
    let collection = this.__componentMap.read(ComponentConstructor.name);
    if (!collection) {
      collection = new Dictionary();
      this.__componentMap.write({
        key   : ComponentConstructor.name,
        value : collection,
      });
    }
    const component = new ComponentConstructor({ data, entity });
    collection.write({
      key   : component.id,
      value : component,
    });
    return component;
  }

  public destroy(component: IComponent<any>): void {
    if (!this.__componentMap.read(component.constructor.name)) {
      return;
    }
    return this.__componentMap.read(component.constructor.name)!.delete(component.id);
  }

  public forEvery<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>):
  (fn: (component: T) => void) => void
  {
    const collection = this.__componentMap.read(ComponentCls.name);
    return collection ? collection.forEach.bind(collection) : () => undefined;
  }

}
