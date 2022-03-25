import Terminal from 'app/abstracts/Terminal';
import OffsetComponent from 'html5-canvas/components/OffsetComponent';

export default class OutputTerminal extends Terminal {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: 'Terminal_out.png' });
    this.$add(OffsetComponent)({ xOffset: 0, yOffset: -25 });
  }

}