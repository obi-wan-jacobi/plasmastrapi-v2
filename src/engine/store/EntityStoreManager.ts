import { Ctor } from '../../framework/types/Ctor';
import IEntity from '../interfaces/IEntity';
import { Optional } from '../../framework/types/Optional';
import StoreManager from '../abstracts/StoreManager';
import StoreMaster from '../masters/StoreMaster';

export default class EntityStoreManager extends StoreManager<IEntity> {

    private readonly __store: StoreMaster;

    constructor(store: StoreMaster) {
        super();
        this.__store = store;
    }

    public create<TEntity extends IEntity, TData>(EntityCtor: Ctor<TEntity, Optional<TData>>, data?: TData): TEntity {
        const entity = super.create(EntityCtor, data);
        entity.bind(this.__store);
        return entity;
    }

    public load(entity: IEntity): void {
        entity.forEach((component) => {
            this.__store.components.load(component);
        });
        super.load(entity);
    }

    public unload(entity: IEntity): void {
        entity.forEach((component) => {
            this.__store.components.unload(component);
        });
        super.unload(entity);
    }

}
