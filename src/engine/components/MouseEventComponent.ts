import Component from '../abstracts/Component';
import { MOUSE_EVENT } from '../enums/MOUSE_EVENT';

export default class MouseEventComponent
extends Component<{
    [key: string]: string | number | boolean
    eventName: MOUSE_EVENT, x: number, y: number, isShiftDown: boolean,
}> {

    constructor() {
        super({
            eventName: MOUSE_EVENT.UNDEFINED,
            x: -Infinity,
            y: -Infinity,
            isShiftDown: false,
        });
    }

}
