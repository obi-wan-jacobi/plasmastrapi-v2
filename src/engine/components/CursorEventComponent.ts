import { CURSOR_EVENT } from '../enums/CURSOR_EVENT';
import Component from '../abstracts/Component';

export default class CursorEventComponent
extends Component<{ eventName: CURSOR_EVENT, x: number, y: number, isShiftDown: boolean }> {

    constructor() {
        super({
            eventName: CURSOR_EVENT.UNDEFINED,
            x: -Infinity,
            y: -Infinity,
            isShiftDown: false,
        });
    }

}
