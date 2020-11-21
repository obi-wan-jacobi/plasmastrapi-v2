import OutputTerminal from './OutputTerminal';

export default class PowerSupply extends OutputTerminal {

  public constructor() {
    super(Object.assign({ labelText: 'power' }, arguments[0]));
  }
}
