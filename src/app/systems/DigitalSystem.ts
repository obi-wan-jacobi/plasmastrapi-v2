import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class DigitalSystem extends System {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(DigitalElement)((gate) => {
      gate.compute();
    });
    entities.forEvery(DigitalElement)((gate) => {
      gate.next();
    });
  }

}