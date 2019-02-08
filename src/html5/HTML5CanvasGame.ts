import Engine from '../engine/Engine';
import HTML5MouseMouseAdapter from './HTML5CanvasMouseAdapter';
import HTML5CanvasViewportAdapter from './HTML5CanvasViewportAdapter';

export default class HTML5CanvasGame extends Engine {

    constructor(canvas: HTMLCanvasElement) {
        super(new HTML5CanvasViewportAdapter(canvas), new HTML5MouseMouseAdapter(canvas));
    }

}
