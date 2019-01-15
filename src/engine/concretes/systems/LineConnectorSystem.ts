/* tslint:disable:no-magic-numbers */
import IPose2D from '../../../geometry/interfaces/IPose2D';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import IShape2D from '../../../geometry/interfaces/IShape2D';
import LineConnectorComponent from '../components/LineConnectorComponent';
import PoseComponent from '../components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import ShapeComponent from '../components/ShapeComponent';
import System from '../../abstracts/System';
import { settings } from '../../engine.config';

export default class LineConnectorSystem extends System<LineConnectorComponent> {

    constructor() {
        super(LineConnectorComponent);
    }

    public once(component: LineConnectorComponent): void {
        const head = component.data.head.get(PoseComponent).data;
        const tail = component.data.tail.get(PoseComponent).data;
        const { pose, shape } = __fromPointsToLine(tail, head);
        component.entity.get(PoseComponent).set(pose);
        component.entity.get(ShapeComponent).set(shape);
    }
}

const __fromPointsToLine = (p1: IPosition2D, p2: IPosition2D): { pose: IPose2D, shape: IShape2D } => {
    return {
        pose: __fromPointsToLinePose(p1, p2),
        shape: new Rectangle({
            width: __fromPointsToEuclideanDistance(p1, p2),
            height: settings.line.height,
        }),
    };
};

const __fromPointsToLinePose = (p1: IPosition2D, p2: IPosition2D): IPose2D => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return {
        x: p1.x + dx / 2,
        y: p1.y + dy / 2,
        a: Math.atan2(dy, dx),
    };
};

const __fromPointsToEuclideanDistance = (p1: IPosition2D, p2: IPosition2D): number => {
    return Math.sqrt(Math.pow(Math.abs(p2.x - p1.x), 2) + Math.pow(p2.y - p1.y, 2));
};
