import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class DefaultToolSystem extends System<any> {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities;
  }

}