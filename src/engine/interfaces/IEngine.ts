import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import { Dict } from 'base/types';
import IPipe from './IPipe';
import IPipeEvent from './IPipeEvent';
import ISystemMaster from './ISystemMaster';

export default interface IEngine<TImageSource, TPipes extends Dict<IPipe<IPipeEvent>>> {

  entities: IEntityMaster;
  components: IComponentMaster;
  systems: ISystemMaster<TPipes>;

  load(src: string): TImageSource;
  once(): void;
  start(): void;
}
