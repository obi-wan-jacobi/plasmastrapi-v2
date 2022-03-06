import Dictionary from 'base/concretes/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import { Void } from 'base/types';
import ISystem from 'engine/interfaces/ISystem';
import ISystemMaster from 'engine/interfaces/ISystemMaster';
import { Stor } from 'engine/types';

export default class SystemMaster<TPipes> implements ISystemMaster<TPipes> {

  private __systems: IDictionary<ISystem<TPipes>> = new Dictionary();

  public add(SystemCtor: Stor<TPipes>): void {
    this.__systems.write({
      key: SystemCtor.name,
      value: new SystemCtor(),
    });
  }

  public remove(SystemCtor: Stor<TPipes>): void {
    this.__systems.delete(SystemCtor.name);
  }

  public forEach(fn: Void<ISystem<TPipes>>): void {
      this.__systems.forEach(fn);
  }

}