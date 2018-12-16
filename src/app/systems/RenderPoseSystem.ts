import PoseComponent from '../components/PoseComponent';
import RenderSystem from 'src/framework/abstracts/RenderSystem';

export default class RenderPoseSystem extends RenderSystem<PoseComponent> {

    public once(component: PoseComponent): void {
        this._context.drawPoint({
            x: component.x,
            y: component.y,
        });
    }

}
