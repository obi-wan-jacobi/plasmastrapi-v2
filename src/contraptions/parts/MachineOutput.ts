import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import PoseComponent from 'foundation/geometry/components/PoseComponent';

export default class MachineOutput extends DigitalElement {

  public constructor() {
    super();
    this.$add(PoseComponent, { x: 0, y: 0, a: 0 });
    this.$appendChild(new OutputTerminal());
  }

  public compute(): void {
    // do nothing
  }

}