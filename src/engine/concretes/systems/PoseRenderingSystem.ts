import { OnlyIfEntityHas } from '../Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/systems/RenderSystem';
import RenderingComponent from '../components/RenderingComponent';

export default class PoseRenderingSystem
 extends RenderSystem<IRenderingProfile<HTML5_COLOUR>> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderingComponent);
    }

    @OnlyIfEntityHas(PoseComponent)
    public once(component: RenderingComponent<IRenderingProfile<HTML5_COLOUR>>): void {
        const pose = component.entity.get(PoseComponent);
        this._ctx.drawPoint(pose.data, component);
    }

}
