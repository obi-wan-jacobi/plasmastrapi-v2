import { Ctor } from '../../framework/types/Ctor';
import IComponent from '../interfaces/IComponent';
import IDataPrimitive from '../interfaces/IDataPrimitive';
import IEntity from '../interfaces/IEntity';
import { Optional } from '../../framework/types/Optional';
import StoreMaster from '../masters/StoreMaster';
import System from './System';
import TypeIndex from '../../framework/data-structures/TypeIndex';
import Unique from '../../framework/abstracts/Unique';

export default class Entity extends TypeIndex<IComponent<any>, IDataPrimitive> implements IEntity {

    public readonly id: string;
    protected _store: StoreMaster;

    constructor() {
        super();
        this.id = Unique.generateUuid();
    }

    public bind(store: StoreMaster): void {
        this._store = store;
        this.forEach((component) => {
            this._store.components.load(component);
        });
    }

    public add<TComponent extends IComponent<TData>, TData extends IDataPrimitive>(
        ComponentCtor: Ctor<TComponent, Optional<TData>>, data?: TData,
    ): TComponent {
        const component = super.add(ComponentCtor, data);
        component.bind(this);
        if (this._store) {
            this._store.components.load(component);
        }
        return component;
    }

    public remove<TComponent extends IComponent<any>>(ComponentCtor: Ctor<TComponent, any>): Optional<TComponent> {
        const component =  super.remove(ComponentCtor);
        if (this._store && component) {
            this._store.components.unload(component);
        }
        return component;
    }

    public load(): void {
        this._store.entities.load(this);
    }

    public unload(): void {
        this._store.entities.unload(this);
    }

}

export function OnlyIfEntityHas<TComponent extends IComponent<any>>(ComponentCtor: Ctor<TComponent, any>)
: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any {
    return function(
        target: System<TComponent>,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ): any {
        const method = descriptor.value;
        descriptor.value = function(component: IComponent<any>): any {
            if (!component.entity.get(ComponentCtor)) {
                return;
            }
            return method.apply(this, arguments);
        };
    };
}

/* tslint:disable:ban-types */
export function OnlyIfEntityIsInstanceOf<TEntity extends Entity>(EntityCtor: Function & { prototype: TEntity })
: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any {
    return function(
        target: System<IComponent<any>>,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ): any {
        const method = descriptor.value;
        descriptor.value = function(component: IComponent<any>): any {
            if (!(component.entity instanceof EntityCtor)) {
                return;
            }
            return method.apply(this, arguments);
        };
    };
}
/* tslint:enable:ban-types */
