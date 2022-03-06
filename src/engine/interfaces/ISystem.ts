import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import ISystemMaster from './ISystemMaster';
import IViewport from './IViewport';

export default interface ISystem<TPipes> {

  once({}: { entities: IEntityMaster; components: IComponentMaster; systems: ISystemMaster<TPipes>; pipes: TPipes; delta: number }): void;

  draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void;

}
