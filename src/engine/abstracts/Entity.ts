import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import Unique from 'foundation/abstracts/Unique';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';
import { Ctor } from '../types';
import { Void } from 'foundation/types';

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

  public readonly $copy = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): TArg => {
    return this.__components.read(ComponentClass.name)!.copy();
  };

  public readonly $mutate = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg) => void) => {
    return (data: TArg): void => {
      const component = this.__components.read(ComponentClass.name);
      if (!component) {
        return this.$add(ComponentClass)(data);
      }
      return component.mutate(data);
    };
  };

  public readonly $patch = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg | {}) => void) => {
    return (data: TArg): void => {
      const component = this.__components.read(ComponentClass.name);
      if (!component) {
        return;
      }
      return component.patch(data);
    };
  };

  public readonly $forEach = (fn: (component: IComponent<any>) => void): void => {
    return this.__components.forEach(fn);
  };

}
