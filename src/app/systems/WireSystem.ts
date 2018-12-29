import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';
import System from '../../framework/abstracts/System';
import Wire from '../entities/Wire';
import WireComponent from '../components/WireComponent';

export default class WireSystem extends System<WireComponent> {

    constructor() {
        super(WireComponent);
    }

    public once(component: WireComponent): void {
        const headPose = (component.entity as Wire).head.get(PoseComponent).data;
        const tailPose = (component.entity as Wire).tail.get(PoseComponent).data;
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
