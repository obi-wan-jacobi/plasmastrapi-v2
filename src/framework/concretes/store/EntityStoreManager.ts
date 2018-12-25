import ComponentStoreManager from './ComponentStoreManager';
import { Ctor } from '../../types/Ctor';
import Engine from '../../Engine';
import Entity from '../Entity';
import StoreManager from '../../abstracts/StoreManager';
import StoreMaster from '../masters/StoreMaster';

export default class EntityStoreManager extends StoreManager<Entity> {

    private __master: StoreMaster;

    constructor(master: StoreMaster) {
        super();
        this.__master = master;
    }

    public create<TEntity extends Entity, TData>(EntityCtor: Ctor<TEntity, TData>, data: TData): TEntity {
        const entity = super.create(EntityCtor, data);
        entity.bind(this.__master);
        return entity;
    }

    public load(entity: Entity): void {
        entity.components.forEach((component) => {
            this.__master.components.load(component);
        });
        super.load(entity);
    }

    public unload(entity: Entity): void {
        entity.components.forEach((component) => {
            this.__master.components.unload(component);
        });
        super.unload(entity);
    }

}
