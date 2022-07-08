import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import AnimationComponent from 'foundation/presentation/components/AnimationComponent';
import Trigger from './Trigger';

export default class TwoWayAnimationTrigger extends Trigger {

  protected _input1: DigitalElement;
  protected _input2: DigitalElement;

  public constructor({ input1, input2 }: { input1: DigitalElement; input2: DigitalElement }) {
    super();
    this._input1 = input1;
    this._input2 = input2;
  }

  public invoke(): void {
    if (!this.$parent) {
      throw new Error(`${this.constructor.name} has no parent!`);
    }
    if (this._input1.isHigh && this._input2.isHigh) {
      this.$parent.$patch(AnimationComponent, { isPaused: true });
      return;
    }
    if (this._input1.isHigh) {
      this.$parent.$patch(AnimationComponent, { isPaused: false, isReversed: false });
      return;
    }
    if (this._input2.isHigh) {
      this.$parent.$patch(AnimationComponent, { isPaused: false, isReversed: true });
      return;
    }
    this.$parent.$patch(AnimationComponent, { isPaused: true });
  }

}