import IRenderContext from '../../interfaces/IRenderContext';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/RenderSystem';

export default class RenderPoseSystem extends RenderSystem<PoseComponent> {

    constructor(context: IRenderContext) {
        super(context, PoseComponent);
    }

    public once(component: PoseComponent): void {
        this._context.drawPoint({
            x: component.data.x,
            y: component.data.y,
        });
    }

}
