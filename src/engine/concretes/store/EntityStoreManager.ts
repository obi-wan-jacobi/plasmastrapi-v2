import { Ctor } from '../../../framework/types/Ctor';
import Entity from '../../abstracts/Entity';
import ISlave from '../../../framework/interfaces/ISlave';
import { Optional } from '../../../framework/types/Optional';
import StoreManager from '../../abstracts/StoreManager';
import StoreMaster from '../masters/StoreMaster';

export default class EntityStoreManager extends StoreManager<Entity> implements ISlave<StoreMaster> {

    public readonly master: StoreMaster;

    constructor(master: StoreMaster) {
        super();
        this.master = master;
    }

    public create<TEntity extends Entity, TData>(EntityCtor: Ctor<TEntity, Optional<TData>>, data?: TData): TEntity {
        const entity = super.create(EntityCtor, data);
        entity.bind(this.master);
        return entity;
    }

    public load(entity: Entity): void {
        entity.forEach((component) => {
            this.master.components.load(component);
        });
        super.load(entity);
    }

    public unload(entity: Entity): void {
        entity.forEach((component) => {
            this.master.components.unload(component);
        });
        super.unload(entity);
    }

}
