import GateFactorySystem from './systems/GateFactorySystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import InputTerminalSystem from './systems/InputTerminalSystem';
import OutputTerminalSystem from './systems/OutputTerminalSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.systems.add(GateFactorySystem);
        this.systems.add(OutputTerminalSystem);
        this.systems.add(InputTerminalSystem);
    }

}
