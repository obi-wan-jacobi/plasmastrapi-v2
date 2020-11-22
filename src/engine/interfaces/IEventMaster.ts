import IEvent from './IEvent';

export default interface IEventMaster<TEvent extends IEvent> {
    next(): TEvent | undefined;
    pipe(event: TEvent): void;
}
