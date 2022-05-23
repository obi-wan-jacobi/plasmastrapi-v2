import DigitalElement from 'app/abstracts/DigitalElement';
import OutputTerminal from 'app/gates/OutputTerminal';
import PoseComponent from 'foundation/geometry/components/PoseComponent';

export default class PowerSource extends DigitalElement {

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    this.$appendChild(new OutputTerminal());
  }

  public compute(): void {
    // do nothing
  }

}