import { Ctor } from '../../types/Ctor';
import IRenderContext from '../../interfaces/IRenderContext';
import RenderableComponent from './RenderableComponent';
import System from '../System';

export default abstract class RenderSystem<TComponent extends RenderableComponent<any>>
extends System<TComponent> {

    protected _context: IRenderContext;

    constructor(context: IRenderContext, ComponentSubclass: Ctor<TComponent, {}>) {
        super(ComponentSubclass);
        this._context = context;

    }

}
