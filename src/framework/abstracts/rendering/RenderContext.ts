import Context from '../Context';
import IPosition2D from '../../interfaces/IPosition2D';
import IRenderContext from '../../interfaces/IRenderContext';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import IShape from '../../interfaces/IShape';

export default abstract class RenderContext<TContext, TRenderProfile extends IRenderingProfile<any>>
extends Context<TContext> implements IRenderContext<TRenderProfile> {

    public get ctx(): TContext {
        return this.unwrap();
    }

    public abstract refresh(): void;

    public abstract drawPoint(point: IPosition2D, renderProfile: TRenderProfile): void;

    public abstract drawShape(shape: IShape, renderProfile: TRenderProfile): void;

}
