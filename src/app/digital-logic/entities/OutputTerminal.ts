import Terminal from './abstracts/Terminal';

export default class OutputTerminal extends Terminal {

  public constructor({}: { x: number; y: number; labelText?: string }) {
    super(Object.assign({ src: './Terminal_out.png' }, arguments[0]));
  }
}
