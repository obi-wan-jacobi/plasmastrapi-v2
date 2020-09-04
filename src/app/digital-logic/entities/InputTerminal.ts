import Terminal from './abstracts/Terminal';

export default class InputTerminal extends Terminal {

  public constructor({ x, y }: { x: number, y: number }) {
    super(Object.assign({ src: './Terminal_in.png' }, arguments[0]));
  }
}