import { Constructor } from '../../../foundation/types';
import Panel from '../../ui/Panel';
import ButtonPanel from './panels/ButtonPanel';
import ContraptionPanel from './panels/ContraptionPanel';
import Contraption from '../../contraptions/abstracts/Contraption';

export default class PlayerConsole<T extends Constructor<Contraption, TArg>, TArg> extends Panel {

  public constructor({ ContraptionCtor, arg }: { ContraptionCtor: T, arg: TArg }) {
    super(arguments[0]);
    this.add(ButtonPanel);
    this.add(ContraptionPanel, {
      x: 1040,
      y: 340,
      width: 440,
      height: 560,
      ContraptionCtor,
      arg
    });
  }
}
