import CurveComponent from '../components/CurveComponent';
import { OnlyIfEntityHas } from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IRenderContext from '../../engine/interfaces/IRenderContext';
import IRenderingProfile from '../../engine/interfaces/IRenderingProfile';
import RenderSystem from '../../engine/abstracts/systems/RenderSystem';
import RenderingComponent from '../../engine/components/RenderingComponent';

export default class LineRenderingSystem extends RenderSystem<IRenderingProfile<HTML5_COLOUR>> {

    constructor(context: IRenderContext<any>) {
        super(context, RenderingComponent);
    }

    @OnlyIfEntityHas(CurveComponent)
    public once(component: RenderingComponent<IRenderingProfile<HTML5_COLOUR>>): void {
        const line = component.entity.get(CurveComponent);
        this._ctx.drawLine(line.data.points, component);
    }

}
