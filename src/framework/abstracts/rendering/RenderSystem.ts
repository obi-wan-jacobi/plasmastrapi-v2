import IComponent from '../../interfaces/IComponent';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderable from '../../interfaces/IRenderable';
import System from '../System';

export default abstract class RenderSystem<TComponent extends IComponent<any> & IRenderable<any>>
extends System<TComponent> {

    protected _context: IRenderContext;

    constructor(context: IRenderContext, ComponentSubclass: new (data: {}) => TComponent) {
        super(ComponentSubclass);
        this._context = context;

    }

}
