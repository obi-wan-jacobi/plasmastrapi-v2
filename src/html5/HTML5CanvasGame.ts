import Engine from '../framework/Engine';
import HTML5CanvasViewportAdapter from './HTML5CanvasViewportAdapter';
import RenderPoseSystem from '../framework/concretes/systems/RenderPoseSystem';

export default class HTML5CanvasGame extends Engine<HTML5CanvasViewportAdapter> {

    constructor(canvas: HTMLCanvasElement) {
        super(new HTML5CanvasViewportAdapter(canvas));
        this.__init();
    }

    private __init(): void {
        this.__initRenderSystems();
    }

    private __initRenderSystems(): void {
        this.systems.add(new RenderPoseSystem(this.viewport.getRenderContext()));
    }

}
