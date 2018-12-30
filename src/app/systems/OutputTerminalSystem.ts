import OutputTerminal from '../entities/OutputTerminal';
import OutputTerminalComponent from '../components/OutputTerminalComponent';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import System from '../../framework/abstracts/System';

export default class OutputTerminalSystem extends System<OutputTerminalComponent> {

    constructor() {
        super(OutputTerminalComponent);
    }

    public once(component: OutputTerminalComponent): void {
        this.__moveRelativeToParent(component);
    }

    private __moveRelativeToParent(component: OutputTerminalComponent): void {
        const parent = (component.entity as OutputTerminal).parent;
        const parentPose = parent.get(PoseComponent);
        const terminalPose = component.entity.get(PoseComponent).data;
        terminalPose.x = parentPose.data.x + component.data.offsetX;
        terminalPose.y = parentPose.data.y + component.data.offsetY;
    }

}
