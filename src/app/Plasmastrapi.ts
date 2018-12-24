import ButtonSystem from './systems/ButtonSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.systems.add(ButtonSystem, undefined);
    }

}
