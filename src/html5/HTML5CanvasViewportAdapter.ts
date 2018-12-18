import Engine from '../framework/Engine';
import HTML5CanvasMouseInputComponent from './components/HTML5CanvasMouseInputComponent';
import HTML5CanvasMouseInputSystem from './systems/HTML5CanvasMouseInputSystem';
import IViewportAdapter from '../framework/interfaces/IViewportAdapter';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from './enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';

export default class HTML5CanvasViewportAdapter implements IViewportAdapter<HTML5CanvasMouseInputComponent> {

    private static __mouseEventToHTML5CanvasMouseInputEventMap: { [key: string]: HTML5_CANVAS_MOUSE_INPUT_EVENT } = {
        mouseenter: HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_ENTER,
        mouseleave: HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_LEAVE,
        mousemove: HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_MOVE,
        mousedown: HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_DOWN,
        mouseup: HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_UP,
        click: HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK,
    };

    private static __canvasOnEventToViewportAdaptedMethodMap
    : { [key: string]: (component: HTML5CanvasMouseInputComponent) => void } = {
        onmouseenter: HTML5CanvasViewportAdapter.prototype.onCursorEnable,
        onmouseleave: HTML5CanvasViewportAdapter.prototype.onCursorDisable,
        onmousemove: HTML5CanvasViewportAdapter.prototype.onCursorTranslate,
        onmousedown: HTML5CanvasViewportAdapter.prototype.onCursorBeginActuation,
        onmouseup: HTML5CanvasViewportAdapter.prototype.onCursorEndActuation,
        onclick: HTML5CanvasViewportAdapter.prototype.onCursorCompleteActuation,
    };

    private __canvas: HTMLCanvasElement;
    private __system: HTML5CanvasMouseInputSystem;
    private __engine: Engine<HTML5CanvasViewportAdapter>;

    constructor(canvas: HTMLCanvasElement) {
        this.__canvas = canvas;
        this.__system = new HTML5CanvasMouseInputSystem();
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

    public bind(engine: Engine<HTML5CanvasViewportAdapter>): void {
        this.__engine = engine;
        this.__engine.systems.add(this.__system);
        this.__init();
    }

    private __init(): void {
        Object.keys(HTML5CanvasViewportAdapter.__canvasOnEventToViewportAdaptedMethodMap)
        .forEach((key) => {
            (this.__canvas as unknown as { [key: string]: (ev: MouseEvent) => void })[key]
            = this.__adapt(HTML5CanvasViewportAdapter.__canvasOnEventToViewportAdaptedMethodMap[key].bind(this));
        });
    }

    private __adapt(target: (component: HTML5CanvasMouseInputComponent) => void): (ev: MouseEvent) => void {
        return (ev: MouseEvent): void => {
            console.log(ev.type);
            const event = new HTML5CanvasMouseInputComponent({
                eventName: HTML5CanvasViewportAdapter.__mouseEventToHTML5CanvasMouseInputEventMap[ev.type],
                cursor: {
                    x: ev.clientX,
                    y: ev.clientY,
                },
            });
            return target(event);
        };
    }

    private __dispatchHTML5CanvasMouseInputEvent(component: HTML5CanvasMouseInputComponent): void {
        if (!this.__engine) {
            throw new Error(`${this.constructor.name} no bind call was made on an engine instance!`);
        }
        // this.__engine.cache.components.getCollection(this.__system.id).write({
        //     key: component.id,
        //     value: component,
        // });
        console.log(component.data.eventName);
    }

}
