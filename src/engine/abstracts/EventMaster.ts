import IEvent from 'engine/interfaces/IEvent';
import IEventMaster from 'engine/interfaces/IEventMaster';

export default abstract class EventMaster<TEvent extends IEvent>
implements IEventMaster<TEvent> {

    private __buffer: TEvent[] = [];

    public next(): TEvent | undefined {
        const event = this.__buffer.shift();
        if (!event) {
            return;
        }
        return event;
    }

    public pipe(event: TEvent): void {
        this.__buffer.push(event);
    }

}