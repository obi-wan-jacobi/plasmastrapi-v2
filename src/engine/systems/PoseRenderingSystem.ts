import { OnlyIfEntityHas } from '../abstracts/Entity';
import IRenderContext from '../interfaces/IRenderContext';
import IRenderingProfile from '../interfaces/IRenderingProfile';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../abstracts/systems/RenderSystem';
import RenderingComponent from '../components/RenderingComponent';

export default class PoseRenderingSystem extends RenderSystem<IRenderingProfile> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderingComponent);
    }

    @OnlyIfEntityHas(PoseComponent)
    public once(component: RenderingComponent<IRenderingProfile>): void {
        const pose = component.entity.get(PoseComponent);
        this._ctx.drawPoint(pose.data, component);
    }

}
