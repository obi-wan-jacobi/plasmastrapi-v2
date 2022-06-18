import Terminal from 'digital-logic/abstracts/Terminal';

export default class InputTerminal extends Terminal {

  public constructor() {
    super({ x: 0, y: 25, src: 'Terminal_in.png' });
  }

}