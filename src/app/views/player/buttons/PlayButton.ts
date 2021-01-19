import LatchButton from './LatchButton';
import IEntityTemplateOverlay from 'app/ui/interfaces/IEntityTemplateOverlay';

export default class PlayButton extends LatchButton {

  public constructor({}: IEntityTemplateOverlay) {
    super(Object.assign({ text: 'play' }, arguments[0]));
  }

  // public $click(): void {
  //   super.$click();
  //   this._$master.forEvery(ToolButton)((button) => {
  //     button.$disable();
  //   });
  //   this._$master.forEvery(DigitalElement)((gate) => {
  //     gate.$disable();
  //   });
  //   this._$master.forEvery(Terminal)((terminal) => {
  //     terminal.$disable();
  //   });
  //   this._$master.forEvery(PowerSupply)((power) => {
  //     power.high();
  //   });
  //   // this._$master.add(ActuatorSystem);
  //   // this._$master.add(SensorSystem);
  //   // this._$master.add(DigitalSystem);
  //   // this._$master.add(ContraptionSystem);
  // }
}
