import UIEntity from 'ui/abstracts/UIEntity';
import DesignerConsole from './designer/DesignerConsole';
import PlayerConsole from './player/PlayerConsole';

export default class EditorView extends UIEntity {

  public constructor() {
    super(arguments[0]);
    this.$appendChild(new DesignerConsole());
    this.$appendChild(new PlayerConsole());
  }
}
