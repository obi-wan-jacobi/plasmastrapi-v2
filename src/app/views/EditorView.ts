import UIEntity from 'ui/abstracts/UIEntity';
import DesignerConsole from './designer/DesignerConsole';

export default class EditorView extends UIEntity {

  public constructor() {
    super(arguments[0]);
    this.$appendChild(new DesignerConsole());
  }
}
