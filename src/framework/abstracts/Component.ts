import DataWrapper from '../concretes/data-structures/DataWrapper';
import IComponent from '../interfaces/IComponent';
import Unique from './Unique';

export default abstract class Component<T extends {}> extends Unique implements IComponent<T> {

    private __data: DataWrapper<T>;

    constructor(data: T) {
        super();
        this.__data = new DataWrapper<T>(data);
        this.set(data);
    }

    public get data(): T {
        return this.__data.unwrap();
    }

    public set(data: T): void {
        Object.assign(this.__data.unwrap(), data);
    }

}
