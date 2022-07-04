import { app } from 'app/main';
import DesignPane from 'app/ui/DesignPane';
import UIPane from 'app/ui/UIPane';
import IContraption from 'contraptions/interfaces/IContraption';
import PowerSource from 'digital-logic/digital-elements/PowerSource';
import PoseComponent from 'foundation/geometry/components/PoseComponent';

export default class DesignerController {

  public constructor() {
    app.root.$appendChild(new UIPane({ x: 640, y: 340, width: 1280, height: 680 }));
    app.root.$appendChild(new DesignPane({ x: 405, y: 340, width: 800, height: 580 }));
    app.root.$appendChild(new PowerSource({ x: 25, y: 610 }));
  }

  public setContraptionIO(contraption: IContraption): void {
    for (let i = 0; i < contraption.inputs.length; i++) {
      contraption.inputs[i].$patch(PoseComponent, { x: 100*(i + 1), y: 75 });
    }
    for (let i = 0; i < contraption.outputs.length; i++) {
      contraption.outputs[i].$patch(PoseComponent, { x: 100*(i + 1), y: 600 });
    }
  }

}