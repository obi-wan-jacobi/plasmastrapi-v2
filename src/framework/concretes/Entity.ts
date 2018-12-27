import ComponentStoreManager from './store/ComponentStoreManager';
import { Ctor } from '../types/Ctor';
import IComponent from '../interfaces/IComponent';
import StoreMaster from './masters/StoreMaster';
import System from '../abstracts/System';
import TypeCollection from './data-structures/TypeCollection';
import Unique from '../abstracts/Unique';

export default class Entity extends Unique {

    private __components: ComponentCollectionEntityInjector;
    private __store: StoreMaster;

    constructor() {
        super();
        this.__components = new ComponentCollectionEntityInjector(this);
    }

    public get $(): StoreMaster {
        return this.__store;
    }

    public get components(): TypeCollection<IComponent<any>> {
        return this.__components;
    }

    public bind(store: StoreMaster): void {
        this.__store = store;
        this.__components.bind(this.__store.components);
    }

    public load(): void {
        this.__store.entities.load(this);
    }

    public unload(): void {
        this.__store.entities.unload(this);
    }

}

class ComponentCollectionEntityInjector extends TypeCollection<IComponent<any>> {

    private __entity: Entity;
    private __store: ComponentStoreManager;

    constructor(entity: Entity) {
        super();
        this.__entity = entity;
    }

    public bind(store: ComponentStoreManager): void {
        this.__store = store;
        this.forEach((component) => {
            this.__store.load(component);
        });
    }

    @InjectComponentDependencies
    public add(component: IComponent<any>): boolean {
        const isAdded = super.add(component);
        component.bind(this.__entity);
        if (this.__store) {
            this.__store.load(component);
        }
        return isAdded;
    }

    public remove<TComponent extends IComponent<any>>(ComponentCtor: Ctor<TComponent, any>): boolean {
        const component = this.get(ComponentCtor);
        if (!component) {
            return false;
        }
        super.remove(ComponentCtor);
        this.__store.unload(component);
        return true;
    }

}

export function EntityMustPossess<TComponent extends IComponent<any>>(ComponentCtor: Ctor<TComponent, any>)
: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => any {
    return function(
        target: System<TComponent>,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ): any {
        const method = descriptor.value;
        descriptor.value = function(component: IComponent<any>): any {
            if (!component.entity.components.get(ComponentCtor)) {
                return;
            }
            method.apply(this, arguments);
        };
    };
}

function InjectComponentDependencies(
    target: ComponentCollectionEntityInjector,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: IComponent<void>): any {
        method.apply(this, arguments);
        if (component.dependencies.length > 0) {
            component.dependencies.forEach((DependencyCtor) => {
                component.entity.components.add(new DependencyCtor({}));
            });
        }
    };
}
