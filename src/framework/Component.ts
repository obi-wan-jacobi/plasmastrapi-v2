import DataWrapper from './wrappers/DataWrapper';
import IComponent from './interfaces/IComponent';
import Unique from './abstracts/Unique';

export default abstract class Component<T extends {}> extends Unique implements IComponent<T> {

    private __data: DataWrapper<T>;

    constructor(data: T) {
        super();
        this.__data = new DataWrapper<T>(data);
    }

    public set(data: T): void {
        Object.assign(this.__data.unwrap(), data);
    }

    public get(): T {
        return this.__data.unwrap();
    }

}