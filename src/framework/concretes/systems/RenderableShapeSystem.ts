import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
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
        const pose = component.entity.components.get(PoseComponent);
        const shape = component.entity.components.get(ShapeComponent);
        const vertices = shape.data.vertices.map((vertex) => {
            return { x: vertex.x + pose.data.x, y: vertex.y + pose.data.y };
        });
        this._context.drawShape({ vertices }, component);
    }

}
