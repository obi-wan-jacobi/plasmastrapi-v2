import LatchButton from './LatchButton';

export default class PlayButton extends LatchButton {

  public constructor() {
    super(Object.assign({ label: 'play' }, arguments[0]));
  }

  public $click(): void {
    super.$click();
    this.$engine.entities.forEvery(ToolButton)((button) => {
      button.$disable();
    });
    this.$engine.entities.forEvery(DigitalElement)((gate) => {
      gate.$disable();
    });
    this.$engine.entities.forEvery(Terminal)((terminal) => {
      terminal.$disable();
    });
    this.$engine.entities.forEvery(PowerSupply)((power) => {
      power.high();
    });
    this.$engine.add(ActuatorSystem);
    this.$engine.add(SensorSystem);
    this.$engine.add(DigitalSystem);
    this.$engine.add(ContraptionSystem);
  }
}