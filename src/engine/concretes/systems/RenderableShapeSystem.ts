import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/systems/RenderSystem';
import RenderableShapeComponent from '../components/RenderableShapeComponent';
import ShapeComponent from '../components/ShapeComponent';
import { transformShape } from '../../../geometry/methods/shapes';

export default class RenderableShapeSystem
extends RenderSystem<RenderableShapeComponent<IRenderingProfile<HTML5_COLOUR>>> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderableShapeComponent);
    }

    public once(component: RenderableShapeComponent<IRenderingProfile<HTML5_COLOUR>>): void {
        const pose = component.entity.get(PoseComponent);
        const shape = component.entity.get(ShapeComponent);
        const { vertices } = transformShape(shape.data, pose.data);
        this._context.drawShape({ vertices }, component);
    }

}
