import Engine from '../framework/Engine';
import HTML5CanvasMouseInputComponent from './components/HTML5CanvasMouseInputComponent';
import HTML5CanvasMouseInputSystem from './systems/HTML5CanvasMouseInputSystem';
import HTML5CanvasRenderContext from './HTML5CanvasRenderContext';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from './enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import IViewportAdapter from '../framework/interfaces/IViewportAdapter';

export default class HTML5CanvasViewportAdapter implements IViewportAdapter<HTML5CanvasMouseInputComponent> {

    private __canvas: HTMLCanvasElement;
    private __system: HTML5CanvasMouseInputSystem;
    private __engine: Engine<HTML5CanvasViewportAdapter>;

    constructor(canvas: HTMLCanvasElement) {
        this.__canvas = canvas;
    }

    public bind(engine: Engine<HTML5CanvasViewportAdapter>): void {
        this.__engine = engine;
        this.__system = new HTML5CanvasMouseInputSystem(this.__engine);
        this.__engine.systems.add(this.__system);
        this.__bindMouseEventsToViewportAdapter();
    }

    public onCursorEnable(component: HTML5CanvasMouseInputComponent): void {
        this.__dispatchHTML5CanvasMouseInputEvent(component);
    }

    public onCursorDisable(component: HTML5CanvasMouseInputComponent): void {
        this.__dispatchHTML5CanvasMouseInputEvent(component);
    }

    public onCursorTranslate(component: HTML5CanvasMouseInputComponent): void {
        this.__dispatchHTML5CanvasMouseInputEvent(component);
    }

    public onCursorBeginActuation(component: HTML5CanvasMouseInputComponent): void {
        this.__dispatchHTML5CanvasMouseInputEvent(component);
    }

    public onCursorEndActuation(component: HTML5CanvasMouseInputComponent): void {
        this.__dispatchHTML5CanvasMouseInputEvent(component);
    }

    public onCursorCompleteActuation(component: HTML5CanvasMouseInputComponent): void {
        this.__dispatchHTML5CanvasMouseInputEvent(component);
    }

    public getRenderContext(): HTML5CanvasRenderContext {
        return new HTML5CanvasRenderContext(this.__canvas);
    }

    public getMouseInputSystem(): HTML5CanvasMouseInputSystem {
        return this.__system;
    }

    public refreshRenderContext(): void {
        const width = this.__canvas.clientWidth;
        const height = this.__canvas.clientHeight;
        const ctx = this.getRenderContext().ctx;
        ctx.clearRect(0, 0, width, height);
    }

    private __bindMouseEventsToViewportAdapter(): void {
        Object.keys(__canvasOnEventToViewportAdaptedMethodMap)
        .forEach((key) => {
            (this.__canvas as unknown as { [key: string]: (ev: MouseEvent) => void })[key]
            = this.__adaptCallbackToViewportMethod(__canvasOnEventToViewportAdaptedMethodMap[key].bind(this));
        });
    }

    private __adaptCallbackToViewportMethod(
        target: (component: HTML5CanvasMouseInputComponent) => void): (ev: MouseEvent) => void
    {
        return (ev: MouseEvent): void => {
            const boundingClientRect = this.__canvas.getBoundingClientRect();
            const event = new HTML5CanvasMouseInputComponent({
                eventName: __mouseEventToHTML5CanvasMouseInputEventMap[ev.type],
                cursor: {
                    x: ev.clientX - boundingClientRect.left,
                    y: ev.clientY - boundingClientRect.top,
                },
            });
            return target(event);
        };
    }

    private __dispatchHTML5CanvasMouseInputEvent(component: HTML5CanvasMouseInputComponent): void {
        if (!this.__engine) {
            throw new Error(`${this.constructor.name} no bind call was made on an engine instance!`);
        }
        this.__engine.cache.components.getCollection(this.__system.id).write({
            key: component.id,
            value: component,
        });
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
: { [key: string]: (component: HTML5CanvasMouseInputComponent) => void } = {
    onmouseenter: HTML5CanvasViewportAdapter.prototype.onCursorEnable,
    onmouseleave: HTML5CanvasViewportAdapter.prototype.onCursorDisable,
    onmousemove: HTML5CanvasViewportAdapter.prototype.onCursorTranslate,
    onmousedown: HTML5CanvasViewportAdapter.prototype.onCursorBeginActuation,
    onmouseup: HTML5CanvasViewportAdapter.prototype.onCursorEndActuation,
    onclick: HTML5CanvasViewportAdapter.prototype.onCursorCompleteActuation,
};
