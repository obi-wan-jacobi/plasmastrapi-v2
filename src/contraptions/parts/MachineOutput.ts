import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import LabelComponent from 'foundation/presentation/components/LabelComponent';

export default class MachineOutput extends DigitalElement {

  public constructor({ labelText }: { labelText: string }) {
    super();
    this.$add(PoseComponent, { x: 0, y: 0, a: 0 });
    const output = this.$appendChild(new OutputTerminal());
    output.$add(LabelComponent, {
      text: labelText,
      fontSize: 18,
      offset: { x: 12, y: 5 },
    });
  }

  public compute(): void {
    // do nothing
  }

}