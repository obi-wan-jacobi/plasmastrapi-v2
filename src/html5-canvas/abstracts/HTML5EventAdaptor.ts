
import Pipe from 'engine/abstracts/Pipe';
import IEvent from 'engine/interfaces/IEvent';
import IHTML5EventTransform from 'html5-canvas/interfaces/IHTML5EventTransform';

export default class HTML5EventAdaptor<
    TElement extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IEvent,
> extends Pipe<TAdaptedEvent> {

    constructor({ element, eventNames, eventMapper }: IHTML5EventTransform<TElement, TSourceEvent, TAdaptedEvent>) {
        super();
        this.__bindEvents({ element, eventNames, eventMapper });
    }

    private __bindEvents({ element, eventNames, eventMapper }: IHTML5EventTransform<TElement, TSourceEvent, TAdaptedEvent>): void {
        eventNames.forEach((name) => {
            element[`on${name}`] = (event: TSourceEvent): void => {
                const adaptedEvent = eventMapper({
                    event,
                    element: element as unknown as TElement,
                });
                this.push(adaptedEvent);
            };
        });
    }

}
