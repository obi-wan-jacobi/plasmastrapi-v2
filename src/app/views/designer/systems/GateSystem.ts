import Gate from 'digital-logic/entities/Gate';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class GateSystem extends System<{}> {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(Gate)((gate) => {
      gate.compute();
    });
    entities.forEvery(Gate)((gate) => {
      gate.tick();
    });
  }

}