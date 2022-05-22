import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import VelocityComponent, { IVelocity } from 'foundation/physics/components/VelocityComponent';
import DigitalTrigger from './DigitalTrigger';

export default class VelocityTrigger extends DigitalTrigger<IVelocity> {

  protected _getComponentToPatch(): Ctor<IComponent<IVelocity>, IVelocity> {
    return VelocityComponent;
  }

}