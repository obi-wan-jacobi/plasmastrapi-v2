import IRenderContext from './IRenderContext';
import IRenderingProfile from './IRenderingProfile';
import ISyncable from './ISyncable';

export default interface IViewportAdapter<TContext, TRenderingProfile extends IRenderingProfile<any>>
extends IRenderContext<TRenderingProfile>, ISyncable {

    ctx: TContext;

}
