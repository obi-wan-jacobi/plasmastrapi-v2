import InputTerminal from '../../digital-logic/entities/InputTerminal';
import OutputTerminal from '../../digital-logic/entities/OutputTerminal';
import UIElement from '../../ui/abstracts/UIElement';

export default abstract class Contraption extends UIElement {

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