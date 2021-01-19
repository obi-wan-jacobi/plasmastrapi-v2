import UIEntity from 'app/ui/abstracts/UIEntity';
import Contraption from '../contraptions/abstracts/Contraption';
import DesignerConsole from './designer/DesignerConsole';
import PlayerConsole from './player/PlayerConsole';

export default class EditorView extends UIEntity {

  public constructor({ contraption }: { contraption: Contraption }) {
    super(arguments[0]);
    this.$appendChild(new DesignerConsole({ contraption }));
    this.$appendChild(new PlayerConsole());
  }
}
