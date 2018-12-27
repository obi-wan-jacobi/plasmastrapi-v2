import { Ctor } from '../../types/Ctor';
import IComponent from '../../interfaces/IComponent';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import System from '../System';

export default abstract class RenderSystem<TComponent extends IComponent<IRenderingProfile<any>>>
extends System<TComponent> {

    protected _context: IRenderContext<any>;

    constructor(context: IRenderContext<any>, ComponentCtor: Ctor<TComponent, {}>) {
        super(ComponentCtor);
        this._context = context;
    }

}
