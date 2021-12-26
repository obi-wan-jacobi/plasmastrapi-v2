import IEvent from 'engine/interfaces/IEvent';
import IPipe from 'engine/interfaces/IPipe';
import clone from 'base/helpers/clone';
import { Volatile } from 'base/types';

export default abstract class Pipe<TEvent extends IEvent> implements IPipe<TEvent> {

    private __event?: TEvent;
    protected _buffer: TEvent[] = [];

    public get event(): Volatile<TEvent> {
        return this.__event
            ? clone(this.__event)
            : undefined;
    }

    public next(): void {
        this.__event = this._buffer.shift();
    }

    public push(event: TEvent): void {
        this._buffer.push(event);
    }

}