import ISystem from '../interfaces/ISystem';
import IViewport from 'engine/interfaces/IViewport';
import IEntityMaster from 'engine/interfaces/IEntityMaster';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

export default abstract class System<TPipes> implements ISystem<TPipes> {

  public once({}: { entities: IEntityMaster; components: IComponentMaster; pipes: TPipes; delta: number }): void { return; }

  public draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void { return; }

}
