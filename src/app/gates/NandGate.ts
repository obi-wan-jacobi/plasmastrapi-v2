import Gate from '../abstracts/Gate';

export default class NandGate extends Gate {

  public constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, src: './NandGate.png' });
  }

}