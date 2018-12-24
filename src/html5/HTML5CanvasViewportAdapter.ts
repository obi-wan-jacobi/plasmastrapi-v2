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

    public onCursorEnable(component: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(component);
    }

    public onCursorDisable(component: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(component);
    }

    public onCursorTranslate(component: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(component);
    }

    public onCursorBeginActuation(component: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(component);
    }

    public onCursorEndActuation(component: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(component);
    }

    public onCursorCompleteActuation(component: HTML5CanvasMouseInputEvent): void {
        this.__inputBuffer.push(component);
    }

    public storeInputs(store: StoreMaster): void {
        const buffer = this.__inputBuffer;
        this.__inputBuffer = [];
        const collection = store.components.get(HTML5CanvasMouseInputEvent);
        if (!collection) {
            throw new Error('No component collection exists for viewport\'s input component type');
        }
        buffer.forEach((component) => {
            collection.add(component);
        });
    }

    public clearStoredInputs(store: StoreMaster): void {
        const collection = store.components.get(HTML5CanvasMouseInputEvent);
        if (!collection) {
            throw new Error('No component collection exists for viewport\'s input component type');
        }
        collection.purge();
    }

    public getRenderContext(): HTML5CanvasRenderContext {
        return this.__renderContext;
    }

    private __bindMouseEventsToViewportAdapter(canvas: HTMLCanvasElement): void {
        Object.keys(__canvasOnEventToViewportAdaptedMethodMap)
        .forEach((key) => {
            (canvas as unknown as { [key: string]: (ev: MouseEvent) => void })[key]
            = this.__adaptCallbackToViewportMethod(__canvasOnEventToViewportAdaptedMethodMap[key].bind(this));
        });
    }

    private __adaptCallbackToViewportMethod(
        target: (component: HTML5CanvasMouseInputEvent) => void): (ev: MouseEvent
    ) => void{
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

const __canvasOnEventToViewportAdaptedMethodMap
: { [key: string]: (component: HTML5CanvasMouseInputEvent) => void } = {
    onmouseenter: HTML5CanvasViewportAdapter.prototype.onCursorEnable,
    onmouseleave: HTML5CanvasViewportAdapter.prototype.onCursorDisable,
    onmousemove: HTML5CanvasViewportAdapter.prototype.onCursorTranslate,
    onmousedown: HTML5CanvasViewportAdapter.prototype.onCursorBeginActuation,
    onmouseup: HTML5CanvasViewportAdapter.prototype.onCursorEndActuation,
    onclick: HTML5CanvasViewportAdapter.prototype.onCursorCompleteActuation,
};
