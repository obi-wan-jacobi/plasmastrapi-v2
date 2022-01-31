import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IPipe from 'engine/interfaces/IPipe';
import clone from 'base/helpers/clone';
import { Volatile } from 'base/types';

export default class Pipe<TEvent extends IPipeEvent> implements IPipe<TEvent> {

    private __event?: TEvent;
    protected _buffer: TEvent[] = [];

    public get event(): Volatile<TEvent> {
        if (!this.__event) {
            return undefined;
        }
        const target = this.__event.target;
        if (target) {
            delete this.__event.target;
        }
        const data = clone(this.__event);
        return Object.assign(data, { target });
    }

    public next(): void {
        this.__event = this._buffer.shift();
    }

    public push(event: TEvent): void {
        this._buffer.push(event);
    }

}