import LatchButton from './LatchButton';
import ToolButton from '../../designer/buttons/ToolButton';
import DigitalElement from '../../../digital-logic/entities/abstracts/DigitalElement';
import Terminal from '../../../digital-logic/entities/abstracts/Terminal';
import PowerSupply from '../../../digital-logic/entities/PowerSupply';

export default class PlayButton extends LatchButton {

  public constructor() {
    super(Object.assign({ label: 'play' }, arguments[0]));
  }

  public $click(): void {
    super.$click();
    this.$master.entities.forEvery(ToolButton)((button) => {
      button.$disable();
    });
    this.$master.entities.forEvery(DigitalElement)((gate) => {
      gate.$disable();
    });
    this.$master.entities.forEvery(Terminal)((terminal) => {
      terminal.$disable();
    });
    this.$master.entities.forEvery(PowerSupply)((power) => {
      power.high();
    });
    this.$master.add(ActuatorSystem);
    this.$master.add(SensorSystem);
    this.$master.add(DigitalSystem);
    this.$master.add(ContraptionSystem);
  }
}