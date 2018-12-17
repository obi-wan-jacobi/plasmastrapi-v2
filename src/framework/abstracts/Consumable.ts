import DataWrapper from '../concretes/data-structures/DataWrapper';
import IConsumable from '../interfaces/IConsumable';

export default class Consumable<TPayload extends {}> implements IConsumable<TPayload> {

    private __dataWrapper: DataWrapper<TPayload>;
    private __isConsumed: boolean;

    constructor(payload: TPayload) {
        this.__dataWrapper = new DataWrapper(payload);
        this.__isConsumed = false;
    }

    public consume(): TPayload {
        if (this.__isConsumed) {
            throw new Error(`${this.constructor.name} was already consumed!`);
        }
        return this.__dataWrapper.unwrap();
    }

}
