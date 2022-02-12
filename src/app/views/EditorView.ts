import UIEntity from 'ui/abstracts/UIEntity';
import CreateGateButton from 'ui/CreateGateButton';
import DeleteGateButton from 'ui/DeleteGateButton';
import DesignerView from './designer/DesignerView';

export default class EditorView extends UIEntity {

  public constructor() {
    super();
    this.$appendChild(new DesignerView());
    this.$appendChild(new CreateGateButton({
      x: 25, y: 25, src: './AndGate.png',
    }));
    this.$appendChild(new DeleteGateButton({
      x: 75, y: 25, src: './TRASHCAN.png',
    }));
  }
}
