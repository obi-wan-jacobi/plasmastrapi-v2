import ButtonSystem from './systems/ButtonSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import TranslatableSystem from './systems/TranslatableSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.systems.add(ButtonSystem, undefined);
        this.systems.add(TranslatableSystem, undefined);
    }

}
