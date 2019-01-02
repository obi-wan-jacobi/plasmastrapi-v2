import { Ctor } from '../../types/Ctor';
import Entity from '../Entity';
import { Optional } from '../../types/Optional';
import StoreManager from '../../abstracts/StoreManager';
import StoreMaster from '../masters/StoreMaster';

export default class EntityStoreManager extends StoreManager<Entity> {

    private __master: StoreMaster;

    constructor(master: StoreMaster) {
        super();
        this.__master = master;
    }

    public create<TEntity extends Entity, TData>(EntityCtor: Ctor<TEntity, Optional<TData>>, data?: TData): TEntity {
        const entity = super.create(EntityCtor, data);
        entity.bind(this.__master);
        return entity;
    }

    public load(entity: Entity): void {
        entity.forEach((component) => {
            this.__master.components.load(component);
        });
        super.load(entity);
    }

    public unload(entity: Entity): void {
        entity.forEach((component) => {
            this.__master.components.unload(component);
        });
        super.unload(entity);
    }

}
