import HTML5CanvasMouseInputComponent from '../../html5/components/HTML5CanvasMouseInputComponent';
import { HTML5_CANVAS_MOUSE_INPUT_EVENT } from '../../html5/enums/HTML5_CANVAS_MOUSE_INPUT_EVENT';
import InputSystem from '../../framework/abstracts/InputSystem';

export default class ButtonSystem extends InputSystem<HTML5CanvasMouseInputComponent> {

    constructor() {
        super(HTML5CanvasMouseInputComponent);
    }

    public once(component: HTML5CanvasMouseInputComponent): void {
        if (component.data.eventName === HTML5_CANVAS_MOUSE_INPUT_EVENT.LEFT_MOUSE_CLICK) {
            console.log('click!');
        }
    }

}
