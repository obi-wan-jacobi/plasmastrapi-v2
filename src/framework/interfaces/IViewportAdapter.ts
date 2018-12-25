import IRenderContext from './IRenderContext';
import IRenderingProfile from './IRenderingProfile';

export default interface IViewportAdapter<TContext, TRenderingProfile extends IRenderingProfile<any>>
extends IRenderContext<TRenderingProfile> {

    refresh(): void;

}
