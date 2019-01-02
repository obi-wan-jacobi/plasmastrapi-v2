import { CURSOR_EVENT } from '../engine/enums/CURSOR_EVENT';
import ComponentStoreManager from '../engine/concretes/store/ComponentStoreManager';
import CursorEventComponent from '../engine/concretes/components/CursorEventComponent';
import ICursorAdapter from '../engine/interfaces/ICursorAdapter';

export default class HTML5MouseCursorAdapter implements ICursorAdapter {

    private __canvas: HTMLCanvasElement;
    private __buffer: CursorEventComponent[];

    constructor(canvas: HTMLCanvasElement) {
        this.__canvas = canvas;
        this.__buffer = [];
        this.__bindCursorEvents();
    }

    public once(components: ComponentStoreManager): void {
        const next = this.__buffer.pop() || {
            data: {
               eventName: CURSOR_EVENT.UNDEFINED,
           },
        };
        components.get(CursorEventComponent).forEach((component) => {
            component.set(next.data);
        });
    }

    private __bindCursorEvents(): void {
        Object.keys(__mouseEventToCursorEventMap)
        .forEach((key) => {
            (this.__canvas as unknown as { [key: string]: (ev: MouseEvent) => void })[`on${key}`]
            = this.__getMouseEventHandler();
        });
    }

    private __getMouseEventHandler(): (ev: MouseEvent) => void {
        return (ev: MouseEvent): void => {
            const boundingClientRect = this.__canvas.getBoundingClientRect();
            const component = new CursorEventComponent();
            component.set({
                eventName: __mouseEventToCursorEventMap[ev.type],
                x: ev.clientX - boundingClientRect.left,
                y: ev.clientY - boundingClientRect.top,
            });
            this.__buffer.unshift(component);
        };
    }

}

const __mouseEventToCursorEventMap: { [key: string]: CURSOR_EVENT } = {
    mouseenter: CURSOR_EVENT.CURSOR_ENABLE,
    mousemove: CURSOR_EVENT.CURSOR_TRANSLATE,
    mouseleave: CURSOR_EVENT.CURSOR_DISABLE,
    mousedown: CURSOR_EVENT.CURSOR_BEGIN_ACTUATION,
    mouseup: CURSOR_EVENT.CURSOR_END_ACTUATION,
    click: CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION,
};
