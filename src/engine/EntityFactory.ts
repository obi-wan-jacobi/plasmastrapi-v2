import Dictionary from '../data-structures/concretes/Dictionary';
import Factory from '../data-structures/concretes/Factory';
import IDictionary from '../data-structures/interfaces/IDictionary';
import IEngine from './interfaces/IEngine';
import IEntity from './interfaces/IEntity';
import IEntityFactory, { EClass } from './interfaces/IEntityFactory';
import IFactory from '../data-structures/interfaces/IFactory';
import Wrapper from '../data-structures/abstracts/Wrapper';
import { Ctor, Optional } from '../data-structures/types';

export default class EntityFactory extends Wrapper<IDictionary<IFactory<IEntity>>> implements IEntityFactory {

  public $engine: IEngine;

  private __cTargets: IEntity[] = [];
  private __dTargets: IEntity[] = [];

  constructor(engine: IEngine) {
    super(new Dictionary());
    this.$engine = engine;
  }

  public create<T extends IEntity, TArg>(EntityCtor: Ctor<T, Optional<TArg>>, arg?: TArg): T {
    const instance = new EntityCtor(Object.assign({}, arg, { engine: this.$engine }));
    this.__cTargets.push(instance);
    return instance;
  }

  public destroy(entity: IEntity): void {
    this.__dTargets.push(entity);
  }

  public forEvery<T extends IEntity>(EntityCtor: EClass<T>): (fn: (entity: T) => void) => void {
    const collection = this.unwrap().read(EntityCtor.name);
    return collection ? collection.forEach.bind(collection) : function (): void { return; };
  }

  public first<T extends IEntity>(EntityCtor: EClass<T>): (fn: (entity: T) => boolean) => T | undefined {
    const collection = this.unwrap().read(EntityCtor.name);
    return collection ? collection.first.bind(collection) : function (): void { return; };
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
        let factory = this.unwrap().read(target.constructor.name);
        if (!factory) {
          factory = new Factory();
          this.unwrap().write({
            key: target.constructor.name,
            value: factory,
          });
        }
        factory.add(instance);
        target = target.__proto__;
      }
    }
  }

  private __destroyTargets(): void {
    while (this.__dTargets.length) {
      const entity = this.__dTargets.shift()!;
      entity.$forEach((component) => {
        this.$engine.components.destroy(component);
      });
      let target: any = entity;
      while (target) {
        this.unwrap().read(target.constructor.name).destroy(entity);
        target = target.__proto__;
      }
    }
  }

}
