import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import IViewport from './IViewport';

export default interface ISystem<TPipes> {

  once({}: { entities: IEntityMaster; components: IComponentMaster; pipes: TPipes; delta: number }): void;

  draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void;

}
