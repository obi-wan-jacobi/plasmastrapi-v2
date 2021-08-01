import IUnique from 'core/interfaces/IUnique';
import { Dict } from 'core/types';
import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import IEvent from './IEvent';
import IPipe from './IPipe';
import IViewport from './IViewport';

export default interface ISystem<TPipes extends Dict<IPipe<IEvent>>> extends IUnique {

  once({}: { entities: IEntityMaster; components: IComponentMaster; pipes: TPipes; delta: number }): void;

  draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void;

}
