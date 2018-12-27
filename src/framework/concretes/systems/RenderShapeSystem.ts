import { EntityMustPossess } from '../Entity';
import IRenderContext from '../../interfaces/IRenderContext';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/systems/RenderSystem';
import RenderingComponent from '../components/RenderingComponent';
import ShapeComponent from '../components/ShapeComponent';

export default class RenderShapeSystem extends RenderSystem<ShapeComponent> {

    constructor(context: IRenderContext<any>) {
        super(context, ShapeComponent);
    }

    @EntityMustPossess(PoseComponent)
    @EntityMustPossess(RenderingComponent)
    public once(component: ShapeComponent): void {
        const pose = component.entity.components.get(PoseComponent);
        const renderProfile = component.entity.components.get(RenderingComponent);
        const vertices = component.data.vertices.map((vertex) => {
            return { x: vertex.x + pose.data.x, y: vertex.y + pose.data.y };
        });
        const shape = { vertices };
        this._context.drawShape(shape, renderProfile);
    }

}
