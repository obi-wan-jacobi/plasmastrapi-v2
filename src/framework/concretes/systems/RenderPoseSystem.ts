import IRenderContext from '../../interfaces/IRenderContext';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/rendering/RenderSystem';

export default class RenderPoseSystem<TColourType> extends RenderSystem<PoseComponent<TColourType>> {

    constructor(context: IRenderContext) {
        super(context, PoseComponent);
    }

    public once(component: PoseComponent<TColourType>): void {
        this._context.drawPoint({
            x: component.data.x,
            y: component.data.y,
        });
    }

}
