import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorComponent from '../../framework/concretes/components/CursorComponent';
import HTML5CanvasMouseInputEvent from '../events/HTML5CanvasMouseInputEvent';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import StoreMaster from '../../framework/concretes/masters/StoreMaster';
import System from '../../framework/abstracts/System';

export default class HTML5CanvasMouseInputSystem extends System<HTML5CanvasMouseInputEvent> {

    private __store: StoreMaster;

    constructor(store: StoreMaster) {
        super(HTML5CanvasMouseInputEvent);
        this.__store = store;
    }

    public once(event: HTML5CanvasMouseInputEvent): void {
        this.__store.components.get(CursorComponent).forEach((component) => {
            component.set({
                eventName: __eventMap[event.data.eventName],
                cursor: event.data.cursor
            });
        });
    }

}

const __eventMap: { [key: string]: string} = {
    [HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_ENTER]: CURSOR_EVENT.CURSOR_ENABLE,
    [HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_MOVE]: CURSOR_EVENT.CURSOR_TRANSLATE,
    [HTML5_CANVAS_MOUSE_INPUT_EVENT.MOUSE_LEAVE]: CURSOR_EVENT.CURSOR_DISABLE,
    [HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_DOWN]: CURSOR_EVENT.CURSOR_BEGIN_ACTUATION,
    [HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_UP]: CURSOR_EVENT.CURSOR_END_ACTUATION,
    [HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK]: CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION,
};
