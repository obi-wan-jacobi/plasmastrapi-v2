import { Ctor } from '../types/Ctor';

export default abstract class System<TPayload extends {}> {

    private __key: string;

    constructor(PayloadSubclass: Ctor<TPayload, {}>) {
        this.__key = PayloadSubclass.name;
    }

    public get key(): string {
        return this.__key;
    }

    public abstract once(payload: TPayload): void;

}
