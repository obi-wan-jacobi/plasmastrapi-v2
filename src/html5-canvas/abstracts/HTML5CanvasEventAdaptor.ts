
import EventMaster from 'engine/abstracts/EventMaster';
import IEvent from 'engine/interfaces/IEvent';
import IHTML5EventTransform from 'html5-canvas/interfaces/IHTML5EventTransform';

export default class HTML5EventAdaptor<
    THTML5Element extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IEvent,
> extends EventMaster<TAdaptedEvent> {

    constructor({ element, eventNames, eventMapper }: IHTML5EventTransform<THTML5Element, TSourceEvent, TAdaptedEvent>) {
        super();
        this.__bindEvents({ element, eventNames, eventMapper });
    }

    private __bindEvents({ element, eventNames, eventMapper }: IHTML5EventTransform<THTML5Element, TSourceEvent, TAdaptedEvent>): void {
        eventNames.forEach((name) => {
            element[`on${name}`] = (event: TSourceEvent): void => {
                const adaptedEvent = eventMapper({
                    event,
                    element: element as unknown as THTML5Element,
                });
                this.pipe(adaptedEvent);
            };
        });
    }

}
