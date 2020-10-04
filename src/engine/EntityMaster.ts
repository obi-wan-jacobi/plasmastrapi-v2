import Dictionary from '../foundation/concretes/Dictionary';
import IDictionary from '../foundation/interfaces/IDictionary';
import IEntity from './interfaces/IEntity';
import IEntityMaster from './interfaces/IEntityMaster';
import IComponentMaster from './interfaces/IComponentMaster';
import { Etor } from './types';
import { Index } from '../foundation/types';
import ComponentMaster from './ComponentMaster';

export default class EntityMaster implements IEntityMaster {

  private __entityMap: IDictionary<IDictionary<IEntity>> = new Dictionary();
  private __cTargets: IEntity[] = [];
  private __dTargets: IEntity[] = [];

  public componentMaster: IComponentMaster = new ComponentMaster();

  public create<T extends IEntity, TArg>(EntityClass: Etor<T, TArg>, arg?: TArg): T {
    const instance = new EntityClass(Object.assign({}, arg, { master: this }));
    this.__cTargets.push(instance);
    return instance;
  }

  public destroy(entity: IEntity): void {
    this.__dTargets.push(entity);
  }

  public forEvery<T extends IEntity>(EntityCtor: Etor<T, any>): (fn: (entity: T) => void) => void {
    const collection = this.__entityMap.read(EntityCtor.name);
    return collection ? collection.forEach.bind(collection) : (): void => undefined;
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
            key: target.constructor.name,
            value: collection,
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
