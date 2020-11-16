import Contraption from '../../../contraptions/abstracts/Contraption';
import Panel from '../../../ui/Panel';
import { Constructor } from 'foundation/types';

export default class ContraptionPanel<T extends Constructor<Contraption, TArg>, TArg> extends Panel {

  public constructor({ ContraptionCtor, arg }: { ContraptionCtor: T; arg: TArg }) {
    super(arguments[0]);
    this.appendChild(ContraptionCtor, arg);
  }
}
