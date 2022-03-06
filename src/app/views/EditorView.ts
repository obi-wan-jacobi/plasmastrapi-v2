import PowerSource from 'digital-logic/entities/PowerSource';
import UIEntity from 'ui/abstracts/UIEntity';
import DesignerView from './designer/DesignerView';
import PlayerConsole from './designer/PlayerConsole';

export default class EditorView extends UIEntity {

  public constructor() {
    super();
    const designerView = this.$appendChild(new DesignerView());
    designerView.$appendChild(new PowerSource({ x: 25, y: 600 }));
    this.$appendChild(new PlayerConsole());
  }
}
