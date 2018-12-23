import { Ctor } from '../../types/Ctor';
import IRenderContext from '../../interfaces/IRenderContext';
import RenderableComponent from './RenderableComponent';
import System from '../System';

export default abstract class RenderSystem<TComponent extends RenderableComponent<any>>
extends System<TComponent> {

    protected _context: IRenderContext;

    constructor(context: IRenderContext, ComponentCtor: Ctor<TComponent, {}>) {
        super(ComponentCtor);
        this._context = context;

    }

}
