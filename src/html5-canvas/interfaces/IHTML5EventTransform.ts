import { Dict, Void } from 'base/types';
import IEvent from 'engine/interfaces/IEvent';

export default interface IHTML5EventTransform<
    TElement extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IEvent
> {
    element:  TElement & Dict<Void<TSourceEvent>>;
    eventNames: string[];
    eventMapper: ({ event, element }: { event: TSourceEvent; element: TElement }) => TAdaptedEvent;
}