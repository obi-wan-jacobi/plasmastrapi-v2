import Gate from 'digital-logic/entities/Gate';
import Wire from 'digital-logic/entities/Wire';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';
import StyleComponent from 'foundation/presentation/components/StyleComponent';

export default class WireSystem extends System<{}> {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(Wire)((wire) => {
      if (wire.input.$parent && (wire.input.$parent as Gate).isHigh) {
        wire.$patch(StyleComponent)({ colour: 'GREEN' });
      } else if (wire.input.$parent && (wire.input.$parent as Gate).isLow) {
        wire.$patch(StyleComponent)({ colour: 'PINK' });
      }
    });
  }

}