import Dictionary from '../framework/concretes/Dictionary';
import Factory from '../framework/concretes/Factory';
import IDictionary from '../framework/interfaces/IDictionary';
import IEngine from './interfaces/IEngine';
import IEntity from './interfaces/IEntity';
import IEntityMaster from './interfaces/IEntityMaster';
import IFactory from '../framework/interfaces/IFactory';
import Wrapper from '../framework/abstracts/Wrapper';
import { Ctor, Optional } from '../framework/types';

export default class EntityMaster extends Wrapper<IDictionary<IFactory<IEntity>>> implements IEntityMaster {

    public $engine: IEngine;

    public creationTargets: IEntity[] = [];
    public destructionTargets: IEntity[] = [];

    constructor(engine: IEngine) {
        super(new Dictionary());
        this.$engine = engine;
    }

    public create<T extends IEntity, TArg>(EntityCtor: Ctor<T, Optional<TArg>>, arg?: TArg): T {
        const instance = new EntityCtor(Object.assign({}, arg, { engine: this.$engine }));
        this.creationTargets.push(instance);
        return instance;
    }

    public destroy(entity: IEntity): void {
        this.destructionTargets.push(entity);
    }

    public forEvery<T extends IEntity>(EntityCtor: Ctor<T, any>): (fn: (entity: T) => void) => void {
        const collection = this.unwrap().read(EntityCtor.name);
        return collection ? collection.forEach.bind(collection) : function(): void { return; };
    }

    public first<T extends IEntity>(EntityCtor: Ctor<T, any>): (fn: (entity: T) => void) => void {
        const collection = this.unwrap().read(EntityCtor.name);
        return collection ? collection.first.bind(collection) : function(): void { return; };
    }

    public find<T extends IEntity>(EntityCtor: Ctor<T, any>): (fn: (entity: T) => boolean) => T | undefined {
        const collection = this.unwrap().read(EntityCtor.name);
        return collection ? collection.find.bind(collection) : function(): void { return; };
    }

    public once(): void {
        this.__createTargets();
        this.__destroyTargets();
    }

    private __createTargets(): void {
        while (this.creationTargets.length) {
            const instance = this.creationTargets.shift()!;
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
        while (this.destructionTargets.length) {
            const entity = this.destructionTargets.shift()!;
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
