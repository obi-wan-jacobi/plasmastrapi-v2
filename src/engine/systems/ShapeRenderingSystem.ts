import RenderSystem from '../abstracts/systems/RenderSystem';
import IRenderingProfile from '../interfaces/IRenderingProfile';
import IRenderContext from '../interfaces/IRenderContext';
import RenderingComponent from '../components/RenderingComponent';
import ShapeComponent from '../components/ShapeComponent';
import { OnlyIfEntityHas } from '../abstracts/Entity';
import { transformShape } from '../../geometry/methods/shapes';
import PoseComponent from '../components/PoseComponent';

export default class ShapeRenderingSystem<T>
extends RenderSystem<IRenderingProfile<T>> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderingComponent);
    }

    @OnlyIfEntityHas(ShapeComponent)
    public once(component: RenderingComponent<IRenderingProfile<T>>): void {
        const pose = component.entity.get(PoseComponent);
        const shape = component.entity.get(ShapeComponent);
        const { vertices } = transformShape(shape.data, pose.data);
        this._ctx.drawShape({ vertices }, component);
    }

}
