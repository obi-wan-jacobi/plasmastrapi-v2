import RenderSystem from 'src/framework/abstracts/RenderSystem';
import PoseComponent from '../components/PoseComponent';

export default class RenderPoseSystem extends RenderSystem<PoseComponent> {

    public once({ component }: { component: PoseComponent }): void {
        this._context.drawPoint({
            x: component.x,
            y: component.y,
        });
    }

}
