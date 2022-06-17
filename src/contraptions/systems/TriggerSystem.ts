import Trigger from 'contraptions/triggers/Trigger';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class TriggerSystem extends System {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(Trigger)((rule) => {
      rule.invoke();
    });
  }

}