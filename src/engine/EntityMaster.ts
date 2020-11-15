import ComponentMaster from './ComponentMaster';
import IComponentMaster from './interfaces/IComponentMaster';
import IEntity from './interfaces/IEntity';
import IEntityMaster from './interfaces/IEntityMaster';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';
import { Index } from 'foundation/types';
import { EntityClass, Etor } from './types';

export default class EntityMaster implements IEntityMaster {

  public componentMaster: IComponentMaster = new ComponentMaster();

  private __entityMap: IDictionary<IDictionary<IEntity>> = new Dictionary();
  private __cTargets: IEntity[] = [];
  private __dTargets: IEntity[] = [];

  public create<T extends IEntity, TArg>(EntityConstructor: Etor<T, TArg>, data: TArg): T {
    const instance = new EntityConstructor(Object.assign({}, data, { master: this }));
    this.__cTargets.push(instance);
    return instance;
  }

  public destroy(entity: IEntity): void {
    this.__dTargets.push(entity);
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

  public once(): void {
    this.__createTargets();
    this.__destroyTargets();
  }

  private __createTargets(): void {
    while (this.__cTargets.length) {
      const instance = this.__cTargets.shift()!;
      let target: any = instance;
      while (target) {
        let collection = this.__entityMap.read(target.constructor.name);
        if (!collection) {
          collection = new Dictionary();
          this.__entityMap.write({
            key   : target.constructor.name,
            value : collection,
          });
        }
        collection.write({ key: instance.id, value: instance });
        target = target.__proto__;
      }
    }
  }

  private __destroyTargets(): void {
    while (this.__dTargets.length) {
      const entity = this.__dTargets.shift()!;
      entity.$forEach((component) => {
        this.componentMaster.destroy(component);
      });
      let target: IEntity = entity;
      while (target) {
        this.__entityMap.read(target.constructor.name)!.delete(entity.id);
        target = (target as Index<any>).__proto__;
      }
    }
  }

}
