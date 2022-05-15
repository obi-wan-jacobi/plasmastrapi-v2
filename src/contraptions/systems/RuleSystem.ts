import Rule from 'contraptions/augments/Rule';
import System from 'engine/abstracts/System';
import IEntityMaster from 'engine/interfaces/IEntityMaster';

export default class RuleSystem extends System {

  public once({ entities }: { entities: IEntityMaster }): void {
    entities.forEvery(Rule)((rule) => {
      rule.invoke();
    });
  }

}