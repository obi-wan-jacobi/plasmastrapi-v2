import LatchButton from './LatchButton';

export default class ResetButton extends LatchButton {

  public constructor() {
    super(Object.assign({ label: 'reset' }, arguments[0]));
  }

  public $click(): void {
    super.$click();
    this.$master.remove(ActuatorSystem);
    this.$master.remove(SensorSystem);
    this.$master.remove(DigitalSystem);
    this.$master.remove(ContraptionSystem);
    this.$master.entities.forEvery(ToolButton)((button) => {
      button.$enable();
    });
    this.$master.entities.forEvery(Terminal)((terminal) => {
      terminal.$enable();
      terminal.off();
    });
    this.$master.entities.forEvery(Logical)((gate) => {
      gate.$enable();
      gate.off();
    });
    this.$master.entities.forEvery(Contraption)((contraption) => {
      contraption.off();
      contraption.reset();
    });
  }
}