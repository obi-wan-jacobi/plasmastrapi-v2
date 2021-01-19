import IEntity from '../interfaces/IEntity';
import IEntityMaster from '../interfaces/IEntityMaster';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';
import { Dict } from 'foundation/types';
import { EntityClass } from '../types';
import { IOC } from '../abstracts/Entity';

class EntityMaster implements IEntityMaster {

  private __entityMap: IDictionary<IDictionary<IEntity>> = new Dictionary();
  private __registerTargets: IEntity[] = [];
  private __purgeTargets: IEntity[] = [];

  public constructor() {
    IOC.entities = {
      register: (instance: IEntity) => {
        this.__registerTargets.push(instance);
        return instance;
      },
      purge: (instance: IEntity) => this.__purgeTargets.push(instance),
    };
  }

  public forEvery<T extends IEntity>(EntityCls: EntityClass<T>): (fn: (entity: T) => void) => void {
    const collection = this.__entityMap.read(EntityCls.name);
    return collection ? collection.forEach.bind(collection) : (): void => undefined;
  }

  public find<T extends IEntity>(EntityCls: EntityClass<T>): (fn: (entity: T) => boolean) => T | undefined {
    return (fn: ((entity: T) => boolean)): T | undefined => {
      const result = this.__entityMap.read(EntityCls.name)!.find(fn);
      if (result) {
        return result as T;
      }
      return undefined;
    };
  }

  public upkeep(): void {
    this.__doRegistrations();
    this.__doPurgation();
  }

  private __doRegistrations(): void {
    while (this.__registerTargets.length) {
      const instance = this.__registerTargets.shift()!;
      let target: any = instance;
      while (target) {
        let collection = this.__entityMap.read(target.constructor.name);
        if (!collection) {
          collection = new Dictionary();
          this.__entityMap.write({
            key: target.constructor.name,
            value: collection,
          });
        }
        collection.write({ key: instance.id, value: instance });
        target = target.__proto__;
      }
    }
  }

  private __doPurgation(): void {
    while (this.__purgeTargets.length) {
      let target = this.__purgeTargets.shift()!;
      while (target) {
        this.__entityMap.read(target.constructor.name)!.delete(target.id);
        target = (target as Dict<any>).__proto__;
      }
    }
  }

}

export const ENTITIES = new EntityMaster();
