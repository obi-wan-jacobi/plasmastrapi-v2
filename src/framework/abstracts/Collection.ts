import IIterable from '../interfaces/IIterable';
import Invocable from './Invocable';

export default abstract class System<T> extends Invocable<void> {

    private __iterable: IIterable<T>;

    constructor({ iterable }: { iterable: IIterable<T> }) {
        super({ method: () => { this.__invokeOnceForEach(); } });
        this.__iterable = iterable;
    }

    private __invokeOnceForEach(fn: (payload: T) => void): void {
        this.__iterable.forEach(fn);
    }

}
