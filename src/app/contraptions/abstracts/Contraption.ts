import UIEntity from 'app/ui/abstracts/UIEntity';
import InputTerminal from '../../digital-logic/entities/InputTerminal';
import OutputTerminal from '../../digital-logic/entities/OutputTerminal';

export default abstract class Contraption extends UIEntity {

  public inputs: InputTerminal[];
  public outputs: OutputTerminal[];

}
