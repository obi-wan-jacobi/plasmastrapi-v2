import { Ctor } from '../../framework/types/Ctor';
import CursorEventComponent from '../concretes/components/CursorEventComponent';
import Engine from '../Engine';
import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import { Optional } from '../../framework/types/Optional';
import System from './System';
import TypeIndex from '../../framework/concretes/data-structures/TypeIndex';
import Unique from '../../framework/abstracts/Unique';

export default class Entity extends TypeIndex<IComponent<any>> implements IEntity {

    public readonly id: string;
    protected _engine: Engine;

    constructor() {
        super();
        this.id = Unique.generateUuid();
        this.add(CursorEventComponent);
    }

    public bind(engine: Engine): void {
        this._engine = engine;
        this.forEach((component) => {
            this._engine.store.components.load(component);
        });
    }

    public add<TComponent extends IComponent<TData>, TData>(
        ComponentCtor: Ctor<TComponent, Optional<TData>>, data?: TData,
    ): TComponent {
        const component = super.add(ComponentCtor, data);
        component.bind(this);
        if (this._engine) {
            this._engine.store.components.load(component);
        }
        return component;
    }

    public remove<TComponent extends IComponent<any>>(ComponentCtor: Ctor<TComponent, any>): Optional<TComponent> {
        const component =  super.remove(ComponentCtor);
        if (this._engine.store && component) {
            this._engine.store.components.unload(component);
        }
        return component;
    }

    public load(): void {
        this._engine.store.entities.load(this);
    }

    public unload(): void {
        this._engine.store.entities.unload(this);
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

export function OnlyIfEntityIsInstanceOf<TEntity extends Entity>(EntityCtor: Ctor<TEntity, any>)
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
