import ButtonSystem from './systems/ButtonSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import RenderPoseSystem from '../framework/concretes/systems/RenderPoseSystem';
import RenderShapeSystem from '../framework/concretes/systems/RenderShapeSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.__init();
    }

    private __init(): void {
        this.systems.add(ButtonSystem);
        this.systems.add(RenderPoseSystem);
        this.systems.add(RenderShapeSystem);
    }

}
