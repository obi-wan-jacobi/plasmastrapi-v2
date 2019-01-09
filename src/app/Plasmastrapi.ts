import GateCreationSystem from './systems/GateCreationSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import WireCreationSystem from './systems/WireCreationSystem';
import WireHandleSystem from './systems/WireHandleSystem';
import WireRemovalSystem from './systems/WireRemovalSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.systems.add(GateCreationSystem);
        this.systems.add(WireCreationSystem);
        this.systems.add(WireHandleSystem);
        this.systems.add(WireRemovalSystem);
    }

}
