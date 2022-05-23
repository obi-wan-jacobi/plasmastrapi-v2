import DigitalElement from 'app/abstracts/DigitalElement';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import OutputTerminal from '../../app/gates/OutputTerminal';

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