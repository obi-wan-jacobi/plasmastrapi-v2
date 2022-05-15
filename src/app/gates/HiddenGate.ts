import DigitalElement from 'app/abstracts/DigitalElement';
import Gate from 'app/abstracts/Gate';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import ImageComponent from 'foundation/presentation/components/ImageComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import MouseComponent from 'html5-canvas/components/MouseComponent';

export default class HiddenGate extends Gate {

  public constructor() {
    super({ x: 0, y: 0, src: '' });
    this.$remove(PoseComponent);
    this.$remove(ImageComponent);
    this.$remove(StyleComponent);
    this.$remove(MouseComponent);
  }

  public compute(): void {
    this.off();
    const isOneHigh = this._inputs.find((wire) => (wire.input.$parent as DigitalElement).isHigh);
    if (isOneHigh) {
      this.high();
      return;
    }
    const isOneLow = this._inputs.find((wire) => (wire.input.$parent as DigitalElement).isLow);
    if (isOneLow) {
      this.low();
      return;
    }
  }

}