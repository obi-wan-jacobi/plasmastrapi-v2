import InputTerminal from '../../digital-logic/entities/InputTerminal';
import OutputTerminal from '../../digital-logic/entities/OutputTerminal';
import UIEntity from '../../ui/abstracts/UIEntity';

export default abstract class Contraption extends UIEntity {

  public inputs: InputTerminal[] = [];
  public outputs: OutputTerminal[] = [];

  public abstract once(): void;
  public abstract off(): void;
  public abstract reset(): void;

  public $destroy(): void {
    super.$destroy();
    this.inputs.forEach((input) => input.$destroy());
    this.outputs.forEach((output) => output.$destroy());
  }
}
