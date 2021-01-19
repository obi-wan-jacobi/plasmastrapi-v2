import IEvent from 'engine/interfaces/IEvent';
import IPipe from 'engine/interfaces/IPipe';
import clone from 'foundation/helpers/clone';

export default abstract class Pipe<TEvent extends IEvent> implements IPipe<TEvent> {

    private __event?: TEvent;
    private __buffer: TEvent[] = [];

    public get event(): TEvent | undefined {
        return this.__event
            ? clone(this.__event)
            : undefined;
    }

    public next(): void {
        this.__event = this.__buffer.shift();
    }

    public push(event: TEvent): void {
        this.__buffer.push(event);
    }

}