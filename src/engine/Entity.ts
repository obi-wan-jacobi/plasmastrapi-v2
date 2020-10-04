import IComponent from './interfaces/IComponent';
import IEntity from './interfaces/IEntity';
import Unique from '../foundation/abstracts/Unique';
import { Ctor } from './types';
import IEntityMaster from './interfaces/IEntityMaster';
import Dictionary from '../foundation/concretes/Dictionary';

export default class Entity extends Unique implements IEntity {

  public $master: IEntityMaster;

  private __components: Dictionary<IComponent<any>> = new Dictionary();

  constructor({ master }: { master: IEntityMaster }) {
    super();
    this.$master = master;
  }

  public $destroy(): void {
    return this.$master.destroy(this);
  }

  public $add<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, { entity: IEntity, data: TArg }>): (data: TArg) => void {
    return (data: TArg) => {
      if (!this.__components.read(ComponentClass.name)) {
        this.__components.write({
          key: ComponentClass.name,
          value: this.$master.componentMaster.create(this, ComponentClass, data)
        });
      }
    };
  }

  public $remove<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void {
    if (!this.__components.read(ComponentClass.name)) {
      return;
    }
    this.$master.componentMaster.destroy(this.__components.read(ComponentClass.name)!);
    this.__components.delete(ComponentClass.name);
  }

  public $copy<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): T | undefined {
    return (this.__components.read(ComponentClass.name))
      ? this.__components.read(ComponentClass.name)!.copy()
      : undefined;
  }

  public $mutate<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg) => void) | undefined {
    if (!this.__components.read(ComponentClass.name)) {
      return;
    }
    return (data: TArg) => this.__components.read(ComponentClass.name)!.mutate(data);
  }

  public $patch<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: {}) => void) | undefined {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      return;
    }
    return (data: {}) => {
      component.mutate(Object.assign({}, component!.copy(), data));
    };
  }

  public $forEach(fn: (component: IComponent<any>) => void): void {
    return this.__components.forEach(fn);
  }

}
