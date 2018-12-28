import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import PoseComponent from '../components/PoseComponent';
import RenderSystem from '../../abstracts/systems/RenderSystem';
import RenderablePoseComponent from '../components/RenderablePoseComponent';

export default class RenderablePoseSystem
 extends RenderSystem<RenderablePoseComponent<IRenderingProfile<HTML5_COLOUR>>> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderablePoseComponent);
    }

    public once(component: RenderablePoseComponent<IRenderingProfile<HTML5_COLOUR>>): void {
        const pose = component.entity.get(PoseComponent);
        this._context.drawPoint(pose.data, component);
    }

}
