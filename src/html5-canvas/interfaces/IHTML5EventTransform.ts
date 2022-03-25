import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default interface IHTML5EventTransform<
    TElement extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IPipeEvent
> {
    element:  TElement;
    eventNames: string[];
    eventMapper: ({ event, element }: { event: TSourceEvent; element: TElement }) => TAdaptedEvent;
}