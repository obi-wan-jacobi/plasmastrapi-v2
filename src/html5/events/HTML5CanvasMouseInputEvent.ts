import Component from '../../framework/abstracts/Component';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import IPosition2D from '../../framework/interfaces/IPosition2D';

export default class HTML5CanvasMouseInputEvent
extends Component<{ eventName: HTML5_CANVAS_MOUSE_INPUT_EVENT, cursor: IPosition2D }> {

    constructor({ eventName, cursor }:
    { eventName: HTML5_CANVAS_MOUSE_INPUT_EVENT, cursor: IPosition2D }) {
        super({ eventName, cursor });
    }

}
