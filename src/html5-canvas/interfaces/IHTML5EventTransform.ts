import { Dict, Void } from 'base/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default interface IHTML5EventTransform<
    TElement extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IPipeEvent
> {
    element:  TElement & Dict<Void<TSourceEvent>>;
    eventNames: string[];
    eventMapper: ({ event, element }: { event: TSourceEvent; element: TElement }) => TAdaptedEvent;
}