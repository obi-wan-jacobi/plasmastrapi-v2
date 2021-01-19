import IEntityTemplate from 'app/ui/interfaces/IEntityTemplate';
import UIButton from '../../../ui/UIButton';

export default abstract class LatchButton extends UIButton {

  public constructor({}: IEntityTemplate) {
    super(arguments[0]);
  }

  // public $click(): void {
  //   this._$master.forEvery(LatchButton)((button) => {
  //     button.$enable();
  //   });
  // }
}
