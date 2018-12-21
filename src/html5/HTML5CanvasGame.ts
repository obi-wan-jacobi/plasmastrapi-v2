import Engine from '../framework/Engine';
import HTML5CanvasMouseInputSystem from './systems/HTML5CanvasMouseInputSystem';
import HTML5CanvasViewportAdapter from './HTML5CanvasViewportAdapter';
import RenderPoseSystem from '../framework/concretes/systems/RenderPoseSystem';
import RenderShapeSystem from '../framework/concretes/systems/RenderShapeSystem';

export default class HTML5CanvasGame extends Engine<HTML5CanvasViewportAdapter> {

    constructor(canvas: HTMLCanvasElement) {
        super(new HTML5CanvasViewportAdapter(canvas));
        this.__init();
    }

    private __init(): void {
        this.__initInputSystems();
        this.__initRenderSystems();
    }

    private __initInputSystems(): void {
        this.systems.addInputReceiver(new HTML5CanvasMouseInputSystem());
    }

    private __initRenderSystems(): void {
        this.systems.addRenderer(new RenderPoseSystem(this.viewport.getRenderContext()));
        this.systems.addRenderer(new RenderShapeSystem(this.viewport.getRenderContext()));
    }

}
