import UIEntity from 'ui/abstracts/UIEntity';
import CreateAndGateButton from 'app/CreateAndGateButton';
import DeleteGateButton from 'app/DeleteGateButton';
import WireCutterButton from 'app/WireCutterButton';
import CreateNandGateButton from 'app/CreateNandGateButton';

export default class DesignerView extends UIEntity {

  public constructor() {
    super({
      pose: { x: 400, y: 340, a: 0 },
      shape: { width: 800, height: 560 },
      style: {
        colour: 'WHITE',
        opacity: 1,
        fill: 'rgba(0,0,0,0)',
        zIndex: 0,
      },
    });
    this.$appendChild(new CreateAndGateButton({ x: 25, y: 25 }));
    this.$appendChild(new CreateNandGateButton({ x: 75, y: 25 }));
    this.$appendChild(new DeleteGateButton({ x: 125, y: 25 }));
    this.$appendChild(new WireCutterButton({ x: 175, y: 25 }));
  }

}
