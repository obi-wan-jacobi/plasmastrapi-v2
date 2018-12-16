import IRenderContext from '../../framework/interfaces/IRenderContext';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../framework/abstracts/RenderSystem';

export default class RenderPoseSystem extends RenderSystem<PoseComponent> {

    constructor(context: IRenderContext) {
        super(context, PoseComponent);
    }

    public once(component: PoseComponent): void {
        console.log('render pose component ' + JSON.stringify(component.data));
        this._context.drawPoint({
            x: component.data.x,
            y: component.data.y,
        });
    }

}
