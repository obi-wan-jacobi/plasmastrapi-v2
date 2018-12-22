import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import HTML5CanvasMouseInputSystem from '../html5/systems/HTML5CanvasMouseInputSystem';
import RenderPoseSystem from '../framework/concretes/systems/RenderPoseSystem';
import RenderShapeSystem from '../framework/concretes/systems/RenderShapeSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.__init();
    }

    private __init(): void {
        this.__initInputSystems();
        this.__initRenderSystems();
    }

    private __initInputSystems(): void {
        this.systems.addInputReceiver(HTML5CanvasMouseInputSystem);
    }

    private __initRenderSystems(): void {
        this.systems.addRenderer(RenderPoseSystem);
        this.systems.addRenderer(RenderShapeSystem);
    }

}
