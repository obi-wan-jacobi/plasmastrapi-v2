import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import Unique from 'base/abstracts/Unique';
import Dictionary from 'base/concretes/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import { Ctor } from '../types';
import { Void, Volatile } from 'base/types';

export const IOC = {
  entities: {
    register: (entity: IEntity): IEntity => entity,
    purge: ({}: IEntity): void => undefined,
  },
  components: {
    register: (component: IComponent<any>): IComponent<any> => component,
    purge: ({}: IComponent<any>): void => undefined,
  },
};

export default abstract class Entity extends Unique implements IEntity {

  private __components: IDictionary<IComponent<any>> = new Dictionary();

  public constructor() {
    super();
    IOC.entities.register(this);
  }

  public $destroy(): void {
    IOC.entities.purge(this);
    this.$forEach((component) => IOC.components.purge(component));
  }

  public readonly $add = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Void<TArg> => {
    return (data: TArg): void => {
      if (!this.__components.read(ComponentClass.name)) {
        const component = new ComponentClass({ data, entity: this });
        this.__components.write({
          key: ComponentClass.name,
          value: IOC.components.register(component),
        });
        return;
      }
      return this.$mutate(ComponentClass)(data);
    };
  };

  public readonly $remove = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void => {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      return;
    }
    this.__components.delete(ComponentClass.name);
    IOC.components.purge(component);
  };

  public readonly $copy = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Volatile<TArg> => {
    const component = this.__components.read(ComponentClass.name);
    return component ? component.copy() : undefined;
  };

  public readonly $mutate = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Void<TArg | {}> => {
    return (data: TArg): void => {
      const component = this.__components.read(ComponentClass.name);
      if (!component) {
        return this.$add(ComponentClass)(data);
      }
      return component.mutate(data);
    };
  };

  public readonly $patch = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Void<TArg | {}> => {
    return (data: TArg): void => {
      const component = this.__components.read(ComponentClass.name);
      if (!component) {
        return;
      }
      return component.patch(data);
    };
  };

  public readonly $forEach = (fn: Void<IComponent<any>>): void => {
    return this.__components.forEach(fn);
  };

}
