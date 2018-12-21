import IRenderContext from '../../interfaces/IRenderContext';
import RenderSystem from '../../abstracts/rendering/RenderSystem';
import ShapeComponent from '../components/ShapeComponent';

export default class RenderShapeSystem<TColourType> extends RenderSystem<ShapeComponent<TColourType>> {

    constructor(context: IRenderContext) {
        super(context, ShapeComponent);
    }

    public once(component: ShapeComponent<TColourType>): void {
        this._context.drawShape(component.data);
    }

}
