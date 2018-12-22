import Engine from '../framework/Engine';
import HTML5CanvasViewportAdapter from './HTML5CanvasViewportAdapter';

export default class HTML5CanvasGame extends Engine<HTML5CanvasViewportAdapter> {

    constructor(canvas: HTMLCanvasElement) {
        super(new HTML5CanvasViewportAdapter(canvas));
    }

}
