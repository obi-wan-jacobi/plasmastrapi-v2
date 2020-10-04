import Dictionary from '../foundation/concretes/Dictionary';
import IComponent from './interfaces/IComponent';
import IComponentMaster from './interfaces/IComponentMaster';
import IDictionary from '../foundation/interfaces/IDictionary';
import { Ctor } from './types';
import IEntity from './interfaces/IEntity';

export default class ComponentMaster implements IComponentMaster {

  private __componentMap: IDictionary<IDictionary<IComponent<any>>> = new Dictionary();

  public create<T extends IComponent<TArg>, TArg>(entity: IEntity, ComponentClass: Ctor<T, { entity: IEntity, data: TArg }>, data: TArg): T {
    let collection = this.__componentMap.read(ComponentClass.name);
    if (!collection) {
      collection = new Dictionary();
      this.__componentMap.write({
        key: ComponentClass.name,
        value: collection,
      });
    }
    const component = new ComponentClass({ entity, data });
    collection.write({
      key: component.id,
      value: component,
    });
    return component;
  }

  public destroy(component: IComponent<any>): void {
    if (!this.__componentMap.read(component.constructor.name)) {
      return;
    }
    return this.__componentMap.read(component.constructor.name)!.delete(component.id);
  }

  public forEvery<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): (fn: (component: T) => void) => void {
    const collection = this.__componentMap.read(ComponentClass.name);
    return collection ? collection.forEach.bind(collection) : function (): void { return; };
  }

}
