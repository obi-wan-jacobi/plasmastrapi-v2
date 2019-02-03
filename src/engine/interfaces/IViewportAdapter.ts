import IRenderContext from './IRenderContext';
import IRenderingProfile from './IRenderingProfile';
import ISyncable from './ISyncable';

export default interface IViewportAdapter<TContext, TRenderingProfile extends IRenderingProfile>
extends IRenderContext<TRenderingProfile>, ISyncable<void> {

    ctx: TContext;

}
