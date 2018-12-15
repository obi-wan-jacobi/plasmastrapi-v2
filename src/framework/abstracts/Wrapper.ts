import IWrapper from '../templates/IWrapper';

export default abstract class Wrapper<T> implements IWrapper<T> {

    private __target: T;

    constructor({ target }: { target: T }) {
        this.__target = target;
    }

    public unwrap(): T {
        return this.__target;
    }

}
