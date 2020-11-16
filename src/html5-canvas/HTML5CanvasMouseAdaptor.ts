import IAdaptedMouseEvent from '../engine/interfaces/IAdaptedMouseEvent';
import IMouseAdaptor from '../engine/interfaces/IMouseAdaptor';
import IMouseHandler from '../engine/interfaces/IMouseHandler';

/* eslint-disable @typescript-eslint/no-unused-vars */
const defaultHandler = {
    mouseenter: () => undefined,
    mousemove: (mouseEvent: IAdaptedMouseEvent) => undefined,
    mouseleave: () => undefined,
    mousedown: (mouseEvent: IAdaptedMouseEvent) => undefined,
    mouseup: (mouseEvent: IAdaptedMouseEvent) => undefined,
    click: (mouseEvent: IAdaptedMouseEvent) => undefined,
    none: () => undefined,
};
/* eslint-enable @typescript-eslint/no-unused-vars */

export default class HTML5CanvasMouseAdaptor implements IMouseAdaptor {

    private __canvas: HTMLCanvasElement & { [key: string]: (me: MouseEvent) => void };
    private __buffer: IAdaptedMouseEvent[];
    private __handler: IMouseHandler;

    constructor(canvas: HTMLCanvasElement & { [key: string]: (me: MouseEvent) => void }) {
        this.__canvas = canvas;
        this.__buffer = [];
        this.__handler = defaultHandler;
        this.__bindMouseEvents();
    }

    public once(): void {
        const event = this.__buffer.shift();
        if (event) {
            this.__handler[event.name](event);
        } else {
            this.__handler.none({
                name: 'none',
                x: 0,
                y: 0,
                isCtrlDown: false,
                isShiftDown: false,
            });
        }
    }

    public handler(handler: IMouseHandler): void {
        this.__handler = handler;
    }

    private __bindMouseEvents(): void {
        [
            'mouseenter',
            'mousemove',
            'mouseleave',
            'mousedown',
            'mouseup',
            'click',
        ]
        .forEach((key) => {
            this.__canvas[`on${key}`] = (ev: MouseEvent): void => {
                const boundingClientRect = this.__canvas.getBoundingClientRect();
                this.__buffer.push({
                    name: ev.type,
                    x: ev.clientX - boundingClientRect.left,
                    y: ev.clientY - boundingClientRect.top,
                    isCtrlDown: ev.ctrlKey,
                    isShiftDown: ev.shiftKey,
                });
            };
        });
    }

}
