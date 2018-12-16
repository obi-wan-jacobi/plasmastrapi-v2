import IInvocable from '../interfaces/IInvocable';
import { Optional } from '../types/Optional';

export default abstract class Invocable<T> implements IInvocable<T> {

    private __method: (payload: Optional<any>) => Optional<T>;

    constructor({ method }: { method: (payload: Optional<any>) => Optional<T> }) {
        this.__method = method;
    }

    public invoke(payload: Optional<any>): Optional<T> {
        return this.__method(payload);
    }

}
