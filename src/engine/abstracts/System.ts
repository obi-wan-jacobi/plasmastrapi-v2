import ISystem from '../interfaces/ISystem';
import Unique from 'core/abstracts/Unique';
import IPipe from 'engine/interfaces/IPipe';
import IEvent from 'engine/interfaces/IEvent';
import { Dict } from 'core/types';
import IViewport from 'engine/interfaces/IViewport';
import IEntityMaster from 'engine/interfaces/IEntityMaster';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

export default abstract class System<TPipes extends Dict<IPipe<IEvent>>> extends Unique implements ISystem<TPipes> {

  public once({}: { entities: IEntityMaster; components: IComponentMaster; pipes: TPipes; delta: number }): void { return; }

  public draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void { return; }

}
