import IComponent from './interfaces/IComponent';
import IEngine from './interfaces/IEngine';
import IEntity from './interfaces/IEntity';
import Unique from '../framework/abstracts/Unique';
import { Ctor } from '../framework/types';

export default class Entity extends Unique implements IEntity {

    public $engine: IEngine;

    private __data: { [key: string]: IComponent<any> };

    constructor({ engine }: { engine: IEngine }) {
        super();
        this.$engine = engine;
        this.__data = {};
    }

    public $destroy(): void {
        return this.$engine.entities.destroy(this);
    }

    public $add<T>(ComponentCtor: Ctor<IComponent<T>, T>): (data: T) => void {
        return (data: T) => {
            if (!this.__data[ComponentCtor.name]) {
                this.__data[ComponentCtor.name] = this.$engine.components.create(ComponentCtor, data);
                this.__data[ComponentCtor.name].inject(this);
            }
            return this.$mutate(ComponentCtor)(data);
        };
    }

    public $remove<T>(ComponentCtor: Ctor<IComponent<T>, T>): void {
        if (!this.__data[ComponentCtor.name]) {
            return;
        }
        delete this.__data[ComponentCtor.name];
        this.$engine.components.destroy(this.__data[ComponentCtor.name]);
    }

    public $copy<T>(ComponentCtor: Ctor<IComponent<T>, T>): T {
        return (this.__data[ComponentCtor.name])
            ? this.__data[ComponentCtor.name].copy()
            : undefined;
    }

    public $mutate<T>(ComponentCtor: Ctor<IComponent<T>, T>): (data: T) => void {
        return (data: T) => {
            this.__data[ComponentCtor.name].mutate(data);
        };
    }

    public $patch<T>(ComponentCtor: Ctor<IComponent<T>, T>): (data: {}) => void {
        return (data: {}) => {
            this.__data[ComponentCtor.name].mutate(Object.assign(this.__data[ComponentCtor.name].copy(), data));
        };
    }

    public $forEach(fn: (component: IComponent<any>) => void): void {
        Object.keys(this.__data).forEach((key) => {
            fn(this.__data[key]);
        });
    }

}
