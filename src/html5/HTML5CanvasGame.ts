import Engine from '../framework/Engine';
import HTML5CanvasViewportAdapter from './HTML5CanvasViewportAdapter';
import HTML5MouseCursorAdapter from './HTML5MouseCursorAdapter';

export default class HTML5CanvasGame extends Engine {

    constructor(canvas: HTMLCanvasElement) {
        super(new HTML5CanvasViewportAdapter(canvas), new HTML5MouseCursorAdapter(canvas));
    }

}
