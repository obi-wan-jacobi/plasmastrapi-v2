import Constraint from 'contraptions/constraints/Constraint';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class ConstraintSystem extends System {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(Constraint)((rule) => {
      rule.invoke();
    });
  }

}