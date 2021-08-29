import UIEntity from 'ui/abstracts/UIEntity';
import DesignerView from './designer/DesignerView';

export default class EditorView extends UIEntity {

  public constructor() {
    super();
    this.$appendChild(new DesignerView());
  }
}
