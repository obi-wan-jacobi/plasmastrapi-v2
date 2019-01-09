import { Ctor } from '../../../framework/types/Ctor';
import Entity from '../../abstracts/Entity';
import { Optional } from '../../../framework/types/Optional';
import StoreManager from '../../abstracts/StoreManager';
import StoreMaster from '../masters/StoreMaster';

export default class EntityStoreManager extends StoreManager<Entity> {

    private readonly __store: StoreMaster;

    constructor(store: StoreMaster) {
        super();
        this.__store = store;
    }

    public create<TEntity extends Entity, TData>(EntityCtor: Ctor<TEntity, Optional<TData>>, data?: TData): TEntity {
        const entity = super.create(EntityCtor, data);
        entity.bind(this.__store);
        return entity;
    }

    public load(entity: Entity): void {
        entity.forEach((component) => {
            this.__store.components.load(component);
        });
        super.load(entity);
    }

    public unload(entity: Entity): void {
        entity.forEach((component) => {
            this.__store.components.unload(component);
        });
        super.unload(entity);
    }

}
