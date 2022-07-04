import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import LabelComponent from 'foundation/presentation/components/LabelComponent';

export default class MachineOutput extends DigitalElement {

  public constructor({ labelText }: { labelText: string }) {
    super();
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