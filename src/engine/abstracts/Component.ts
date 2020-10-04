import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import Unique from '../../foundation/abstracts/Unique';

export default abstract class Component<T extends {}> extends Unique implements IComponent<T> {

  public $entity: IEntity;

  private __data: T;

  constructor({ data, entity }: { data: T, entity: IEntity }) {
    super();
    this.$entity = entity;
    this.mutate(data);
  }

  public copy(): T {
    return this.__clone(this.__data);
  }

  public mutate(data: T): void {
    this.__data = this.__clone(data);
  }

  private __clone(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }

}
