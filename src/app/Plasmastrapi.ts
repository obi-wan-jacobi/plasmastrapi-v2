import ChildPoseOffsetSystem from './systems/ChildPoseOffsetSystem';
import CircuitDesignSystem from './systems/CircuitDesignSystem';
import GateCreationSystem from './systems/GateCreationSystem';
import GateRemovalSystem from './systems/GateRemovalSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import LinePoseSystem from './systems/LinePoseSystem';
import LineRenderingSystem from './systems/LineRenderingSystem';
import WireCreationSystem from './systems/WireCreationSystem';
import LineDrawingSystem from './systems/WireCuttingPathSystem';
import WireRemovalSystem from './systems/WireRemovalSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.systems.add(ChildPoseOffsetSystem);
        this.systems.add(LinePoseSystem);
        this.systems.add(LineDrawingSystem);
        this.systems.add(LineRenderingSystem, this.viewport);
        this.systems.add(GateCreationSystem);
        this.systems.add(GateRemovalSystem);
        this.systems.add(WireCreationSystem);
        this.systems.add(WireRemovalSystem);
        this.systems.add(CircuitDesignSystem);
    }

}
