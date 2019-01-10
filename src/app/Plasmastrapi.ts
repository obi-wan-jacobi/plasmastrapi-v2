import GateCreationSystem from './systems/GateCreationSystem';
import GateRemovalSystem from './systems/GateRemovalSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import WireCreationSystem from './systems/WireCreationSystem';
import WireRemovalSystem from './systems/WireRemovalSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.systems.add(GateCreationSystem);
        this.systems.add(GateRemovalSystem);
        this.systems.add(WireCreationSystem);
        this.systems.add(WireRemovalSystem);
    }

}
