import ComponentStoreManager from '../engine/store/ComponentStoreManager';
import IMouseAdapter from '../engine/interfaces/IMouseAdapter';
import { MOUSE_EVENT } from '../engine/enums/MOUSE_EVENT';
import MouseEventComponent from '../engine/components/MouseEventComponent';

export default class HTML5CanvasMouseAdapter implements IMouseAdapter {

    private __canvas: HTMLCanvasElement;
    private __buffer: MouseEventComponent[];

    constructor(canvas: HTMLCanvasElement) {
        this.__canvas = canvas;
        this.__buffer = [];
        this.__bindMouseEvents();
    }

    public sync(components: ComponentStoreManager): void {
        const next = this.__buffer.pop() || { data: { eventName: MOUSE_EVENT.UNDEFINED } };
        components.get(MouseEventComponent).forEach((component) => {
            component.mutate(next.data);
        });
    }

    private __bindMouseEvents(): void {
        Object.keys(__mouseEventToMouseEventMap)
        .forEach((key) => {
            (this.__canvas as unknown as { [key: string]: (ev: MouseEvent) => void })[`on${key}`]
            = this.__getMouseEventHandler();
        });
    }

    private __getMouseEventHandler(): (ev: MouseEvent) => void {
        return (ev: MouseEvent): void => {
            const boundingClientRect = this.__canvas.getBoundingClientRect();
            const component = new MouseEventComponent();
            component.mutate({
                eventName: __mouseEventToMouseEventMap[ev.type],
                x: ev.clientX - boundingClientRect.left,
                y: ev.clientY - boundingClientRect.top,
                isShiftDown: ev.shiftKey,
            });
            this.__buffer.unshift(component);
        };
    }

}

const __mouseEventToMouseEventMap: { [key: string]: MOUSE_EVENT } = {
    mouseenter: MOUSE_EVENT.MOUSE_ENTER,
    mousemove: MOUSE_EVENT.MOUSE_MOVE,
    mouseleave: MOUSE_EVENT.MOUSE_LEAVE,
    mousedown: MOUSE_EVENT.MOUSE_DOWN,
    mouseup: MOUSE_EVENT.MOUSE_UP,
    click: MOUSE_EVENT.MOUSE_CLICK,
};
