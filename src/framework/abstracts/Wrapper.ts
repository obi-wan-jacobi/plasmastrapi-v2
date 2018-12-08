import IWrapper from '../templates/IWrapper';

export default abstract class Wrapper<T> implements IWrapper<T> {

    private __item: T;

    constructor({ payload }: { payload: T }) {
        this.__item = payload;
    }

    public unwrap(): T {
        return this.__item;
    }

}
