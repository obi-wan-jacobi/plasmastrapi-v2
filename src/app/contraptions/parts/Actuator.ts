import InputTerminal from '../../digital-logic/entities/InputTerminal';

export default class Actuator extends InputTerminal {

  public constructor({}: { labelText: string }) {
    super(Object.assign({ x: 0, y: 0 }, arguments[0]));
  }
}
