
import { Dict, Void } from 'base/types';
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

    public push(event: TAdaptedEvent): void {
        super.push(event);
        if (this._buffer.length > 2) {
            this._buffer.shift();
        }
    }

    private __bindEvents({ element, eventNames, eventMapper }: IHTML5EventTransform<TElement, TSourceEvent, TAdaptedEvent>): void {
        eventNames.forEach((name) => {
            // why do we have to cast element when it's already constrained???
            (element as Dict<Void<TSourceEvent>>)[`on${name}`] = (event: TSourceEvent): void => {
                const adaptedEvent = eventMapper({
                    event,
                    element,
                });
                this.push(adaptedEvent);
            };
        });
    }

}
