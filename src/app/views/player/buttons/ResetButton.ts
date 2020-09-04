import LatchButton from './LatchButton';

export default class ResetButton extends LatchButton {

  public constructor() {
    super(Object.assign({ label: 'reset' }, arguments[0]));
  }

  public $click(): void {
    super.$click();
    this.$engine.remove(ActuatorSystem);
    this.$engine.remove(SensorSystem);
    this.$engine.remove(DigitalSystem);
    this.$engine.remove(ContraptionSystem);
    this.$engine.entities.forEvery(ToolButton)((button) => {
      button.$enable();
    });
    this.$engine.entities.forEvery(Terminal)((terminal) => {
      terminal.$enable();
      terminal.off();
    });
    this.$engine.entities.forEvery(Logical)((gate) => {
      gate.$enable();
      gate.off();
    });
    this.$engine.entities.forEvery(Contraption)((contraption) => {
      contraption.off();
      contraption.reset();
    });
  }
}