import { Ctor } from '../../../framework/types/Ctor';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import RenderingComponent from '../../components/RenderingComponent';
import System from '../System';

export default abstract class RenderSystem<TProfile extends IRenderingProfile<any>>
extends System<RenderingComponent<TProfile>> {

    protected _ctx: IRenderContext<any>;

    constructor(context: IRenderContext<any>, ComponentCtor: Ctor<RenderingComponent<TProfile>, {}>) {
        super(ComponentCtor);
        this._ctx = context;
    }

}
