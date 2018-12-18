import Component from '../../framework/abstracts/Component';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import ICursorPosition from '../../framework/interfaces/ICursorPosition';

export default class HTML5CanvasMouseInputComponent
extends Component<{ eventName: HTML5_CANVAS_MOUSE_INPUT_EVENT, cursor: ICursorPosition }> {

    constructor({ eventName, cursor }:
    { eventName: HTML5_CANVAS_MOUSE_INPUT_EVENT, cursor: ICursorPosition }) {
        super({ eventName, cursor });
    }

}
