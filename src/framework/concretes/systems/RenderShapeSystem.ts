import IRenderContext from '../../interfaces/IRenderContext';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/rendering/RenderSystem';
import ShapeComponent from '../components/ShapeComponent';

export default class RenderShapeSystem<TColourType> extends RenderSystem<ShapeComponent<TColourType>> {

    constructor(context: IRenderContext) {
        super(context, ShapeComponent);
    }

    public once(component: ShapeComponent<TColourType>): void {
        const pose = component.entity.components.get<PoseComponent<any>>(PoseComponent);
        this._context.drawShape({
            vertices: component.data.vertices.map((vertex) => {
                return { x: vertex.x + pose.data.x, y: vertex.y + pose.data.y };
            }),
            colour: component.data.colour
        });
    }

}
