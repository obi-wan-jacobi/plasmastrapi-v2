import { CURSOR_EVENT } from '../enums/CURSOR_EVENT';
import Component from '../abstracts/Component';

export default class InputComponent
extends Component<{
    [key: string]: string | number | boolean
    eventName: CURSOR_EVENT, x: number, y: number, isShiftDown: boolean,
}> {

    constructor() {
        super({
            eventName: CURSOR_EVENT.UNDEFINED,
            x: -Infinity,
            y: -Infinity,
            isShiftDown: false,
        });
    }

}
