import Panel from '../ui/Panel';
import DesignerConsole from './designer/DesignerConsole';
import Contraption from '../contraptions/abstracts/Contraption';
import PlayerConsole from './player/PlayerConsole';

export default class EditorView extends Panel {

  public constructor({ contraption }: { contraption: Contraption }) {
    super(arguments[0]);
    this.add(DesignerConsole, { contraption })
    this.add(PlayerConsole);
  }
}