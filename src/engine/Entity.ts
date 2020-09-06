import IComponent, { CCtor } from './interfaces/IComponent';
import IEngine from './interfaces/IEngine';
import IEntity from './interfaces/IEntity';
import Unique from '../data-structures/abstracts/Unique';

export default class Entity extends Unique implements IEntity {

  public $engine: IEngine;

  private __data: { [key: string]: IComponent<any> | undefined } = {};

  constructor({ engine }: { engine: IEngine }) {
    super();
    this.$engine = engine;
  }

  public $destroy(): void {
    return this.$engine.entities.destroy(this);
  }

  public $add<T>(ComponentCtor: CCtor<IComponent<T>, T>): (data: T) => void {
    return (data: T) => {
      if (!this.__data[ComponentCtor.name]) {
        this.__data[ComponentCtor.name] = this.$engine.components.create(this, ComponentCtor, data);
      }
      return this.$mutate(ComponentCtor)!(data);
    };
  }

  public $remove<T>(ComponentCtor: CCtor<IComponent<T>, T>): void {
    if (!this.__data[ComponentCtor.name]) {
      return;
    }
    this.$engine.components.destroy(this.__data[ComponentCtor.name]!);
    delete this.__data[ComponentCtor.name];
  }

  public $copy<T>(ComponentCtor: CCtor<IComponent<T>, T>): T | undefined {
    return (this.__data[ComponentCtor.name])
      ? this.__data[ComponentCtor.name]!.copy()
      : undefined;
  }

  public $mutate<T>(ComponentCtor: CCtor<IComponent<T>, T>): ((data: T) => void) | undefined {
    if (!this.__data[ComponentCtor.name]) {
      return;
    }
    return (data: T) => this.__data[ComponentCtor.name]!.mutate(data);
  }

  public $patch<T>(ComponentCtor: CCtor<IComponent<T>, T>): ((data: {}) => void) | undefined {
    if (!this.__data[ComponentCtor.name]) {
      return;
    }
    return (data: {}) => {
      this.__data[ComponentCtor.name]!.mutate(Object.assign(this.__data[ComponentCtor.name]!.copy(), data));
    };
  }

  public $forEach(fn: (component: IComponent<any>) => void): void {
    return Object.keys(this.__data).forEach((key) => {
      fn(this.__data[key]!);
    });
  }

}
