import Engine from '../framework/Engine';
import HTML5CanvasMouseInputSystem from './systems/HTML5CanvasMouseInputSystem';
import HTML5CanvasViewportAdapter from './HTML5CanvasViewportAdapter';

export default class HTML5CanvasGame extends Engine<HTML5CanvasViewportAdapter> {

    constructor(canvas: HTMLCanvasElement) {
        super(new HTML5CanvasViewportAdapter(canvas));
        this.systems.add(HTML5CanvasMouseInputSystem, this.store);
    }

}
