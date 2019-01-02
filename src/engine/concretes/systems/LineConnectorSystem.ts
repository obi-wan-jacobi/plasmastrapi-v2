import LineConnectorComponent from '../components/LineConnectorComponent';
import PoseComponent from '../components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
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
            width: Math.sqrt(Math.pow(Math.abs(headPose.x - tailPose.x), 2) + Math.pow(headPose.y - tailPose.y, 2)),
            height: 8,
        }));
    }

}
