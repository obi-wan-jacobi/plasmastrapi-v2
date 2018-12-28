import InputTerminal from '../entities/InputTerminal';
import InputTerminalComponent from '../components/InputTerminalComponent';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import System from '../../framework/abstracts/System';

export default class InputTerminalSystem extends System<InputTerminalComponent> {

    constructor() {
        super(InputTerminalComponent);
    }

    public once(component: InputTerminalComponent): void {
        const parent = (component.entity as InputTerminal).parent;
        const parentPose = parent.get(PoseComponent);
        const terminalPose = component.entity.get(PoseComponent).data;
        terminalPose.x = parentPose.data.x + component.data.offsetX;
        terminalPose.y = parentPose.data.y + component.data.offsetY;
    }

}
