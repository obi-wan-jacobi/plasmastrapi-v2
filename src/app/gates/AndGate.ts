import Gate from '../abstracts/Gate';

export default class AndGate extends Gate {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './AndGate.png' });
  }

}