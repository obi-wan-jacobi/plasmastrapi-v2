import ButtonSystem from './systems/ButtonSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import WireCreationSystem from './systems/WireCreationSystem';
import WireHandleSystem from './systems/WireHandleSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.systems.add(ButtonSystem);
        this.systems.add(WireCreationSystem);
        this.systems.add(WireHandleSystem);
    }

}
