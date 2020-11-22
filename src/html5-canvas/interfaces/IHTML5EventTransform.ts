import IEvent from 'engine/interfaces/IEvent';
import { Dict, Void } from 'foundation/types';

export default interface IHTML5EventTransform<
    THTML5Element extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IEvent
> {
    element: Dict<Void<TSourceEvent>>;
    eventNames: string[];
    eventMapper: ({ event, element }: { event: TSourceEvent; element: THTML5Element }) => TAdaptedEvent;
}