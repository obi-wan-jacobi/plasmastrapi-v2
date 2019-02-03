import { CURSOR_EVENT } from '../engine/enums/CURSOR_EVENT';
import ComponentStoreManager from '../engine/store/ComponentStoreManager';
import IInputAdapter from '../engine/interfaces/IInputAdapter';
import InputComponent from '../engine/components/InputComponent';

export default class HTML5CanvasInputAdapter implements IInputAdapter {

    private __canvas: HTMLCanvasElement;
    private __buffer: InputComponent[];

    constructor(canvas: HTMLCanvasElement) {
        this.__canvas = canvas;
        this.__buffer = [];
        this.__bindInputs();
    }

    public sync(components: ComponentStoreManager): void {
        const next = this.__buffer.pop() || { data: { eventName: CURSOR_EVENT.UNDEFINED } };
        components.get(InputComponent).forEach((component) => {
            component.mutate(next.data);
        });
    }

    private __bindInputs(): void {
        Object.keys(__mouseEventToInputMap)
        .forEach((key) => {
            (this.__canvas as unknown as { [key: string]: (ev: MouseEvent) => void })[`on${key}`]
            = this.__getMouseEventHandler();
        });
    }

    private __getMouseEventHandler(): (ev: MouseEvent) => void {
        return (ev: MouseEvent): void => {
            const boundingClientRect = this.__canvas.getBoundingClientRect();
            const component = new InputComponent();
            component.mutate({
                eventName: __mouseEventToInputMap[ev.type],
                x: ev.clientX - boundingClientRect.left,
                y: ev.clientY - boundingClientRect.top,
                isShiftDown: ev.shiftKey,
            });
            this.__buffer.unshift(component);
        };
    }

}

const __mouseEventToInputMap: { [key: string]: CURSOR_EVENT } = {
    mouseenter: CURSOR_EVENT.CURSOR_ENABLE,
    mousemove: CURSOR_EVENT.CURSOR_TRANSLATE,
    mouseleave: CURSOR_EVENT.CURSOR_DISABLE,
    mousedown: CURSOR_EVENT.CURSOR_BEGIN_ACTUATION,
    mouseup: CURSOR_EVENT.CURSOR_END_ACTUATION,
    click: CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION,
};
