import Button from '../../../ui/Button';

export default class LatchButton extends Button {

  public constructor({ x, y, label }: { x: number; y: number; label: string }) {
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
