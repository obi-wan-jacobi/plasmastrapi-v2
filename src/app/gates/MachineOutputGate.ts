import Gate from 'app/abstracts/Gate';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';

export default class MachineOutputGate extends Gate {

  public constructor() {
    super({ x: 0, y: 0, src: '' });
    this.$remove(PoseComponent);
    this.$remove(ImageComponent);
    this.$remove(StyleComponent);
    this.$remove(MouseComponent);
  }

  public compute(): void {
    // do nothing
  }

}