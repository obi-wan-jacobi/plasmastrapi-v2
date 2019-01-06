import { Ctor } from '../../../framework/types/Ctor';
import Engine from '../../Engine';
import Entity from '../../abstracts/Entity';
import { Optional } from '../../../framework/types/Optional';
import StoreManager from '../../abstracts/StoreManager';

export default class EntityStoreManager extends StoreManager<Entity> {

    private readonly __engine: Engine;

    constructor(engine: Engine) {
        super();
        this.__engine = engine;
    }

    public create<TEntity extends Entity, TData>(EntityCtor: Ctor<TEntity, Optional<TData>>, data?: TData): TEntity {
        const entity = super.create(EntityCtor, data);
        entity.bind(this.__engine);
        return entity;
    }

    public load(entity: Entity): void {
        entity.forEach((component) => {
            this.__engine.store.components.load(component);
        });
        super.load(entity);
    }

    public unload(entity: Entity): void {
        entity.forEach((component) => {
            this.__engine.store.components.unload(component);
        });
        super.unload(entity);
    }

}
