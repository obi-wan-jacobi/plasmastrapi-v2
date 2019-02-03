import ChildPoseOffsetComponent from '../components/ChildPoseOffsetComponent';
import InputTerminal from '../entities/circuit-elements/InputTerminal';
import PoseComponent from '../../engine/components/PoseComponent';
import System from '../../engine/abstracts/System';

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
        const terminalPose = component.entity.get(PoseComponent);
        terminalPose.mutate({
            x: parentPose.data.x + component.data.offsetX,
            y: parentPose.data.y + component.data.offsetY,
            a: parentPose.data.a,
        });
    }

}
