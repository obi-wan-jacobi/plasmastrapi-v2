import ButtonPanel from './panels/ButtonPanel';
import Contraption from '../../contraptions/abstracts/Contraption';
import ContraptionPanel from './panels/ContraptionPanel';
import Panel from '../../ui/Panel';
import { Constructor } from 'foundation/types';

export default class PlayerConsole<T extends Constructor<Contraption, TArg>, TArg> extends Panel {

  public constructor({ ContraptionCtor, arg }: { ContraptionCtor: T; arg: TArg }) {
    super(arguments[0]);
    this.appendChild(ButtonPanel);
    this.appendChild(ContraptionPanel, {
      x: 1040,
      y: 340,
      width: 440,
      height: 560,
      ContraptionCtor,
      arg,
    });
  }
}
