
import { Dict, Void } from 'base/types';
import Pipe from 'engine/concretes/Pipe';
import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IHTML5EventTransform from 'html5-canvas/interfaces/IHTML5EventTransform';

export default class HTML5Pipe<
    TElement extends HTMLElement,
    TSourceEvent extends Event,
    TAdaptedEvent extends IPipeEvent,
> extends Pipe<TAdaptedEvent> {

    constructor({ element, eventNames, eventMapper }: IHTML5EventTransform<TElement, TSourceEvent, TAdaptedEvent>) {
        super();
        this.__bindEvents({ element, eventNames, eventMapper });
    }

    private __bindEvents({ element, eventNames, eventMapper }: IHTML5EventTransform<TElement, TSourceEvent, TAdaptedEvent>): void {
        eventNames.forEach((name) => {
            // why do we have to cast element when it's already constrained???
            (element as unknown as Dict<Void<TSourceEvent>>)[`on${name}`] = (event: TSourceEvent): void => {
                const adaptedEvent = eventMapper({
                    event,
                    element,
                });
                this.push(adaptedEvent);
            };
        });
    }

}
