import IEvent from './IEvent';

export default interface IPipe<TEvent extends IEvent> {
    event?: TEvent;
    next(): void;
    push(event: TEvent): void;
}
