import { Ctor } from '../../types/Ctor';
import DataWrapper from './DataWrapper';
import Dictionary from './Dictionary';
import ITypeManifold from '../../interfaces/ITypeManifold';
import IUnique from '../../interfaces/IUnique';
import TypeUnifold from './TypeUnifold';

export default class TypeManifold<TType extends IUnique> extends DataWrapper<Dictionary<TypeUnifold<TType>>>
implements ITypeManifold<TType> {

    constructor() {
        super(new Dictionary<TypeUnifold<TType>>());
    }

    public get(InstanceConstructor: Ctor<TType, any>): TypeUnifold<TType> {
        if (!this.unwrap().read(InstanceConstructor.name)) {
            this.unwrap().write({
                key: InstanceConstructor.name,
                value: new TypeUnifold<TType>()
            });
        }
        return this.unwrap().read(InstanceConstructor.name);
    }

    public getById(id: string): TypeUnifold<TType> {
        return this.unwrap().read(id);
    }

    public add(instance: TType): boolean {
        if (!this.unwrap().read(instance.constructor.name)) {
            this.unwrap().write({
                key: instance.constructor.name,
                value: new TypeUnifold<TType>()
            });
        }
        return this.unwrap()
            .read(instance.constructor.name)
            .add(instance);
    }

    public remove(instance: TType): boolean {
        return this.unwrap().read(instance.constructor.name).remove(instance.id);
    }

    public prune(InstanceConstructor: Ctor<TType, any>): boolean {
        const inner = this.unwrap().read(InstanceConstructor.name);
        if (!inner) {
            return false;
        }
        inner.purge();
        this.unwrap().delete(InstanceConstructor.name);
        return true;
    }

    public forEach(method: (payload: TypeUnifold<TType>) => void): void {
        this.unwrap().forEach((collection) => {
            method(collection);
        });
    }

}