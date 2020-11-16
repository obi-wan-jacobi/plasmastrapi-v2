import IEntityTemplate from 'app/IEntityTemplate';
import Button from '../../../ui/Button';

export default abstract class LatchButton extends Button {

  public constructor({}: IEntityTemplate) {
    super(arguments[0]);
    this.$disable();
  }

  public $click(): void {
    this._$master.forEvery(LatchButton)((button) => {
      button.$enable();
    });
    this.$disable();
  }
}
