import DigitalElement from 'digital-logic/abstracts/DigitalElement';
import OutputTerminal from 'digital-logic/terminals/OutputTerminal';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';

export default class PowerSource extends DigitalElement {

  public constructor({ x, y }: { x: number; y: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    this.$add(ImageComponent, { src: './power-source.png', zIndex: 1 });
    this.$appendChild(new OutputTerminal());
  }

  public compute(): void {
    // do nothing
  }

}