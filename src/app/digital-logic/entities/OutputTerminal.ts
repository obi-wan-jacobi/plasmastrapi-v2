import Terminal from './abstracts/Terminal';

export default class OutputTerminal extends Terminal {

  public constructor({ x, y }: { x: number, y: number }) {
    super(Object.assign({ src: './Terminal_out.png' }, arguments[0]));
  }
}