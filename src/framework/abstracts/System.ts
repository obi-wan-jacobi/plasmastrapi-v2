import IComponent from '../interfaces/IComponent';
import IIterable from '../interfaces/IIterable';
import Invocable from './Invocable';

export default abstract class System<T extends IComponent<any>> extends Invocable<void> {

    private __iterable: IIterable<T>;

    constructor({ iterable }: { iterable: IIterable<T> }) {
        super({ method: () => { this.__invokeOnceForEach(); } });
        this.__iterable = iterable;
    }

    public abstract once({ component }: { component: T }): void;

    private __invokeOnceForEach(): void {
        this.__iterable.forEach(this.once);
    }

}
