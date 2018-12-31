import LineConnectorComponent from '../components/LineConnectorComponent';
import PoseComponent from '../components/PoseComponent';
import Rectangle from '../geometry/shapes/Rectangle';
import ShapeComponent from '../components/ShapeComponent';
import System from '../../abstracts/System';

export default class LineConnectorSystem extends System<LineConnectorComponent> {

    constructor() {
        super(LineConnectorComponent);
    }

    public once(component: LineConnectorComponent): void {
        const headPose = component.data.head.get(PoseComponent).data;
        const tailPose = component.data.tail.get(PoseComponent).data;
        const pose = component.entity.get(PoseComponent);
        const dx = headPose.x - tailPose.x;
        const dy = headPose.y - tailPose.y;
        pose.data.x = tailPose.x + dx / 2;
        pose.data.y = tailPose.y + dy / 2;
        pose.data.a = Math.atan2(dy, dx);
        const shape = component.entity.get(ShapeComponent);
        shape.set(new Rectangle({
            width: Math.sqrt(__pow2(Math.abs(headPose.x - tailPose.x)) + __pow2(headPose.y - tailPose.y)),
            height: 2,
        }));
    }

}

const __pow2 = (x: number) => {
    return Math.pow(x, 2);
};
