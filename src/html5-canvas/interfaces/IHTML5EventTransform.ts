import IEvent from 'engine/interfaces/IEvent';
import { Dict, Void } from 'core/types';

export default interface IHTML5EventTransform<
    TElement extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IEvent
> {
    element: Dict<Void<TSourceEvent>>;
    eventNames: string[];
    eventMapper: ({ event, element }: { event: TSourceEvent; element: TElement }) => TAdaptedEvent;
}