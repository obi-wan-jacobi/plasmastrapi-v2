import { EntityMustPossess } from '../Entity';
import IRenderContext from '../../interfaces/IRenderContext';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/systems/RenderSystem';
import RenderingComponent from '../components/RenderingComponent';

export default class RenderPoseSystem extends RenderSystem<PoseComponent> {

    constructor(context: IRenderContext<any>) {
        super(context, PoseComponent);
    }

    @EntityMustPossess(RenderingComponent)
    public once(component: PoseComponent): void {
        const renderProfile = component.entity.components.get(RenderingComponent);
        this._context.drawPoint(component.data, renderProfile);
    }

}
