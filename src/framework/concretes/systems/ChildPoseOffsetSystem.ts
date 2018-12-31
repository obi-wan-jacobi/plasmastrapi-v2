import ChildPoseOffsetComponent from '../components/ChildPoseOffsetComponent';
import InputTerminal from '../../../app/entities/InputTerminal';
import PoseComponent from '../components/PoseComponent';
import System from '../../abstracts/System';

export default class ChildPoseOffsetSystem extends System<ChildPoseOffsetComponent> {

    constructor() {
        super(ChildPoseOffsetComponent);
    }

    public once(component: ChildPoseOffsetComponent): void {
        this.__moveRelativeToParent(component);
    }

    private __moveRelativeToParent(component: ChildPoseOffsetComponent): void {
        const parent = (component.entity as InputTerminal).parent;
        const parentPose = parent.get(PoseComponent);
        const terminalPose = component.entity.get(PoseComponent).data;
        terminalPose.x = parentPose.data.x + component.data.offsetX;
        terminalPose.y = parentPose.data.y + component.data.offsetY;
    }

}
