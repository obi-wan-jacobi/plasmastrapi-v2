import HTML5CanvasMouseInputEvent from './events/HTML5CanvasMouseInputEvent';
import HTML5CanvasRenderContext from './HTML5CanvasRenderContext';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from './enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import IViewportAdapter from '../framework/interfaces/IViewportAdapter';
import StoreMaster from '../framework/concretes/masters/StoreMaster';

export default class HTML5CanvasViewportAdapter implements IViewportAdapter<HTML5CanvasMouseInputEvent> {

    private __renderContext: HTML5CanvasRenderContext;
    private __inputBuffer: HTML5CanvasMouseInputEvent[];

    constructor(canvas: HTMLCanvasElement) {
        this.__renderContext = new HTML5CanvasRenderContext(canvas);
        this.__inputBuffer = [];
        this.__bindMouseEventsToViewportAdapter(canvas);
    }

    public onCursorEnable(event: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(event);
    }

    public onCursorDisable(event: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(event);
    }

    public onCursorTranslate(event: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(event);
    }

    public onCursorBeginActuation(event: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(event);
    }

    public onCursorEndActuation(event: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(event);
    }

    public onCursorCompleteActuation(event: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(event);
    }

    public storeInputs(store: StoreMaster): void {
        const one = this.__inputBuffer.shift();
        const collection = store.components.get(HTML5CanvasMouseInputEvent);
        if (!collection) {
            throw new Error('No event collection exists for viewport\'s input event type');
        }
        if (one) {
            collection.add(one);
        }
    }

    public clearStoredInputs(store: StoreMaster): void {
        const collection = store.components.get(HTML5CanvasMouseInputEvent);
        if (!collection) {
            throw new Error('No event collection exists for viewport\'s input event type');
        }
        collection.purge();
    }

    public getRenderContext(): HTML5CanvasRenderContext {
        return this.__renderContext;
    }

    private __bindMouseEventsToViewportAdapter(canvas: HTMLCanvasElement): void {
        Object.keys(__mouseEventToViewportMethodMap)
        .forEach((key) => {
            (canvas as unknown as { [key: string]: (ev: MouseEvent) => void })[key]
            = this.__getMouseEventHandler(__mouseEventToViewportMethodMap[key].bind(this));
        });
    }

    private __getMouseEventHandler(
        target: (event: HTML5CanvasMouseInputEvent) => void
    ): (ev: MouseEvent) => void {
        return (ev: MouseEvent): void => {
            const boundingClientRect = this.__renderContext.bounds;
            const event = new HTML5CanvasMouseInputEvent({
                eventName: __mouseEventToHTML5CanvasMouseInputEventMap[ev.type],
                cursor: {
                    x: ev.clientX - boundingClientRect.left,
                    y: ev.clientY - boundingClientRect.top,
                },
            });
            return target(event);
        };
    }

}

const __mouseEventToHTML5CanvasMouseInputEventMap: { [key: string]: HTML5_CANVAS_MOUSE_INPUT_EVENT } = {
    mouseenter: HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_ENTER,
    mouseleave: HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_LEAVE,
    mousemove: HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_MOVE,
    mousedown: HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_DOWN,
    mouseup: HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_UP,
    click: HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK,
};

const __mouseEventToViewportMethodMap
: { [key: string]: (event: HTML5CanvasMouseInputEvent) => void } = {
    onmouseenter: HTML5CanvasViewportAdapter.prototype.onCursorEnable,
    onmouseleave: HTML5CanvasViewportAdapter.prototype.onCursorDisable,
    onmousemove: HTML5CanvasViewportAdapter.prototype.onCursorTranslate,
    onmousedown: HTML5CanvasViewportAdapter.prototype.onCursorBeginActuation,
    onmouseup: HTML5CanvasViewportAdapter.prototype.onCursorEndActuation,
    onclick: HTML5CanvasViewportAdapter.prototype.onCursorCompleteActuation,
};
