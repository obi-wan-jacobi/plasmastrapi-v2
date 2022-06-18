import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import Wire from 'digital-logic/wires/Wire';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class WireSystem extends System {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(Wire)((wire) => {
      if ((wire.input.$parent as DigitalElement).isHigh) {
        wire.high();
      } else if ((wire.input.$parent as DigitalElement).isLow) {
        wire.low();
      } else {
        wire.off();
      }
    });
  }

}