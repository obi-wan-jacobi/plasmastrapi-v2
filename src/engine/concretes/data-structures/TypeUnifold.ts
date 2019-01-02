import DataWrapper from './DataWrapper';
import Dictionary from './Dictionary';
import IIterable from '../../interfaces/IIterable';
import IUnique from '../../interfaces/IUnique';

export default class TypeUnifold<TType extends IUnique> extends DataWrapper<Dictionary<TType>>
implements IIterable<TType> {

    constructor() {
        super(new Dictionary<TType>());
    }

    public get length(): number {
        return this.unwrap().length;
    }

    public get(key: string): TType {
        return this.unwrap().read(key);
    }

    public add(instance: TType): boolean {
        if (this.unwrap().read(instance.id)) {
            return false;
        }
        this.unwrap().write({
            key: instance.id,
            value: instance,
        });
        return true;
    }

    public remove(key: string): boolean {
        if (!this.unwrap().read(key)) {
            return false;
        }
        this.unwrap().delete(key);
        return true;
    }

    public purge(): void {
        this.unwrap().flush();
    }

    public forEach(method: (value: TType) => void): void {
        this.unwrap().forEach(method);
    }

    public map(method: (value: TType) => any): any[] {
        return this.unwrap().map(method);
    }

    public find(method: (value: TType) => boolean): TType {
        return this.unwrap().find(method);
    }

}
