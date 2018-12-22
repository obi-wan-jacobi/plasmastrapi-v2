import Dictionary from '../concretes/data-structures/Dictionary';
import IUnique from '../interfaces/IUnique';

export default abstract class StoreManager<T extends IUnique> {

    private __store: Dictionary<Dictionary<T>>;

    constructor() {
        this.__store = new Dictionary<Dictionary<T>>();
    }

    public load(target: T): void {
        this.getCollection(target.constructor.name).write({
            key: target.id,
            value: target,
        });
    }

    public unload(target: T): void {
        this.getCollection(target.constructor.name).delete(target.id);
    }

    public getCollection(targetConstructorName: string): Dictionary<T> {
        if (!this.__store.read(targetConstructorName)) {
            this.__store.write({
                key: targetConstructorName,
                value: new Dictionary<T>(),
            });
        }
        return this.__store.read(targetConstructorName);
    }

}
