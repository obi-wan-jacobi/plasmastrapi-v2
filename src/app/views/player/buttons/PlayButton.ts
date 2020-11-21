import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import LatchButton from './LatchButton';
import PowerSupply from '../../../digital-logic/entities/PowerSupply';
import Terminal from '../../../digital-logic/entities/abstracts/Terminal';
import ToolButton from '../../designer/buttons/ToolButton';

export default class PlayButton extends LatchButton {

  public constructor() {
    super(Object.assign({ text: 'play' }, arguments[0]));
  }

  public $click(): void {
    super.$click();
    this._$master.forEvery(ToolButton)((button) => {
      button.$disable();
    });
    this._$master.forEvery(DigitalElement)((gate) => {
      gate.$disable();
    });
    this._$master.forEvery(Terminal)((terminal) => {
      terminal.$disable();
    });
    this._$master.forEvery(PowerSupply)((power) => {
      power.high();
    });
    // this._$master.add(ActuatorSystem);
    // this._$master.add(SensorSystem);
    // this._$master.add(DigitalSystem);
    // this._$master.add(ContraptionSystem);
  }
}
