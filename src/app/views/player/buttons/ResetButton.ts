import IEntityTemplate from 'app/ui/interfaces/IEntityTemplate';
import LatchButton from './LatchButton';

export default class ResetButton extends LatchButton {

  public constructor({}: IEntityTemplate) {
    super(Object.assign({ label: 'reset' }, arguments[0]));
  }

  public $click(): void {
    // super.$click();
    // this._$master.remove(ActuatorSystem);
    // this._$master.remove(SensorSystem);
    // this._$master.remove(DigitalSystem);
    // this._$master.remove(ContraptionSystem);
    // this._$master.forEvery(ToolButton)((button) => {
    //   button.$enable();
    // });
    // this._$master.forEvery(Terminal)((terminal) => {
    //   terminal.$enable();
    //   terminal.off();
    // });
    // this._$master.forEvery(Logical)((gate) => {
    //   gate.$enable();
    //   gate.off();
    // });
    // this._$master.forEvery(Contraption)((contraption) => {
    //   contraption.off();
    //   contraption.reset();
    // });
  }
}
