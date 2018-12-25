import { Ctor } from '../../types/Ctor';
import IRenderContext from '../../interfaces/IRenderContext';
import RenderingComponent from '../../concretes/components/RenderingComponent';
import System from '../System';

export default abstract class RenderSystem<TComponent extends RenderingComponent<any>>
extends System<TComponent> {

    protected _context: IRenderContext<any>;

    constructor(context: IRenderContext<any>, ComponentCtor: Ctor<TComponent, {}>) {
        super(ComponentCtor);
        this._context = context;
    }

}
