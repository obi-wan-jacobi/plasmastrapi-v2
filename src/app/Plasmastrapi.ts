import ChildPoseOffsetSystem from './systems/ChildPoseOffsetSystem';
import CircuitDesignSystem from './systems/CircuitDesignSystem';
import DragSystem from './systems/DragSystem';
import GateCreationSystem from './systems/GateCreationSystem';
import GateRemovalSystem from './systems/GateRemovalSystem';
import HTML5CanvasGame from '../html5/HTML5CanvasGame';
import LinePoseSystem from './systems/LinePoseSystem';
import LineRenderingSystem from './systems/LineRenderingSystem';
import PoseRenderingSystem from '../engine/systems/PoseRenderingSystem';
import ShapeRenderingSystem from '../engine/systems/ShapeRenderingSystem';
import TranslationSystem from './systems/TranslationSystem';
import WireCreationSystem from './systems/WireCreationSystem';
import LineDrawingSystem from './systems/WireCuttingPathSystem';
import WireRemovalSystem from './systems/WireRemovalSystem';

export default class Plasmastrapi extends HTML5CanvasGame {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.__initSystemsInPriorityOrder();
    }
    private __initSystemsInPriorityOrder(): void {
        this.systems.add(TranslationSystem);
        this.systems.add(ChildPoseOffsetSystem);
        this.systems.add(LinePoseSystem);
        this.systems.add(DragSystem);
        this.systems.add(LineDrawingSystem);
        this.systems.add(LineRenderingSystem, this.viewport);
        this.systems.add(PoseRenderingSystem, this.viewport);
        this.systems.add(ShapeRenderingSystem, this.viewport);
        this.systems.add(GateCreationSystem);
        this.systems.add(GateRemovalSystem);
        this.systems.add(WireCreationSystem);
        this.systems.add(WireRemovalSystem);
        this.systems.add(CircuitDesignSystem);
    }

}
