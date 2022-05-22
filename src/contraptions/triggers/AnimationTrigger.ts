import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import AnimationComponent, { IAnimation } from 'foundation/presentation/components/AnimationComponent';
import DigitalTrigger from './DigitalTrigger';

export default class AnimationTrigger extends DigitalTrigger<IAnimation> {

  protected _getComponentToPatch(): Ctor<IComponent<IAnimation>, IAnimation> {
    return AnimationComponent;
  }

}