import Gate from 'app/abstracts/Gate';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class DigitalSystem extends System {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(Gate)((gate) => {
      gate.compute();
    });
    entities.forEvery(Gate)((gate) => {
      gate.next();
    });
  }

}