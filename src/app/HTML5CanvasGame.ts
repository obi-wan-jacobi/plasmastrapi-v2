import Engine from '../framework/Engine';
import HTML5CanvasRenderContext from '../framework/concretes/html5/HTML5CanvasRenderContext';
import RenderPoseSystem from './systems/RenderPoseSystem';

export default class HTML5CanvasGame {

    private __$canvas: HTMLCanvasElement;
    private __engine: Engine;

    constructor($canvas: HTMLCanvasElement) {
        this.__$canvas = $canvas;
        this.__engine = new Engine();
        this.__init();
    }

    public get engine(): Engine {
        return this.__engine;
    }

    public getRenderContext(): HTML5CanvasRenderContext {
        return new HTML5CanvasRenderContext(this.__$canvas);
    }

    private __init(): void {
        this.__initRenderSystems();
    }

    private __initRenderSystems(): void {
        this.__engine.systems.add(new RenderPoseSystem(this.getRenderContext()));
    }

}
