import { OnlyIfEntityHas } from '../Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import LineComponent from '../components/LineComponent';
import RenderSystem from '../../abstracts/systems/RenderSystem';
import RenderingComponent from '../components/RenderingComponent';

export default class LineRenderingSystem extends RenderSystem<IRenderingProfile<HTML5_COLOUR>> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderingComponent);
    }

    @OnlyIfEntityHas(LineComponent)
    public once(component: RenderingComponent<IRenderingProfile<HTML5_COLOUR>>): void {
        const line = component.entity.get(LineComponent);
        this._ctx.drawLine(line.data.points, component);
    }

}
