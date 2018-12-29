import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../interfaces/IPosition2D';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/systems/RenderSystem';
import RenderableShapeComponent from '../components/RenderableShapeComponent';
import ShapeComponent from '../components/ShapeComponent';

export default class RenderableShapeSystem
extends RenderSystem<RenderableShapeComponent<IRenderingProfile<HTML5_COLOUR>>> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderableShapeComponent);
    }

    public once(component: RenderableShapeComponent<IRenderingProfile<HTML5_COLOUR>>): void {
        const pose = component.entity.get(PoseComponent);
        const shape = component.entity.get(ShapeComponent);
        const vertices = shape.data.vertices.map((vertex) => {
            const { x, y } = __rotatePointAboutOrigin(vertex, pose.data.a || 0);
            return {
                x: x + pose.data.x,
                y: y + pose.data.y,
            };
        });
        this._context.drawShape({ vertices }, component);
    }

}

const __rotatePointAboutOrigin = (point: IPosition2D, angleInRadians: number): IPosition2D => {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const x = point.x * c - point.y * s;
    const y = point.x * s + point.y * c;
    return { x, y };
};
