import IInvocable from '../templates/IInvocable';

export default abstract class Invocable<T> implements IInvocable<T> {

    private __method: (payload: any) => T;

    constructor({ method }: { method: (payload: any) => T }) {
        this.__method = method;
    }

    public invoke(payload: any): T {
        return this.__method(payload);
    }

}
