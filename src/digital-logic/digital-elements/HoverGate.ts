import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import Gate from '../abstracts/Gate';

export default class HoverGate extends Gate {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './hoverswitch.png' });
  }

  public compute(): void {

  }

  public [MOUSE_EVENT.MOUSE_ENTER](): void {
    this.high();
    this.next();
  }

  public [MOUSE_EVENT.MOUSE_LEAVE](): void {
    this.low();
    this.next();
  }

}