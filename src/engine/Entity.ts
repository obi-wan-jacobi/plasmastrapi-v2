import IComponent from './interfaces/IComponent';
import IEntity from './interfaces/IEntity';
import IEntityMaster from './interfaces/IEntityMaster';
import Unique from 'foundation/abstracts/Unique';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';
import { Ctor } from './types';

export const IOC: { master?: IEntityMaster } = {
  master: undefined,
};

export default class Entity extends Unique implements IEntity {

  private __master: IEntityMaster;

  private __components: IDictionary<IComponent<any>> = new Dictionary();

  public constructor() {
    super();
    this.__master__(IOC.master!);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __master__(master: IEntityMaster): void {
    this.__master = master;
  }

  protected get _$master(): IEntityMaster {
    return this.__master;
  }

  public $destroy(): void {
    return this._$master.destroy(this);
  }

  public $add<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): (data: TArg) => void {
    return (data: TArg) => {
      if (!this.__components.read(ComponentClass.name)) {
        this.__components.write({
          key: ComponentClass.name,
          value: this._$master.componentMaster.create(this, ComponentClass, data),
        });
      }
    };
  }

  public $remove<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void {
    if (!this.__components.read(ComponentClass.name)) {
      return;
    }
    this._$master.componentMaster.destroy(this.__components.read(ComponentClass.name)!);
    this.__components.delete(ComponentClass.name);
  }

  public $copy<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): TArg {
    return this.__components.read(ComponentClass.name)!.copy();
  }

  public $mutate<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg) => void) {
    return (data: TArg) => this.__components.read(ComponentClass.name)!.mutate(data);
  }

  public $patch<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): ((data: TArg | {}) => void) {
    return (data: {}) => this.__components.read(ComponentClass.name)!.patch(data);
  }

  public $forEach(fn: (component: IComponent<any>) => void): void {
    return this.__components.forEach(fn);
  }

}
