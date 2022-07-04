import { DESIGNER_EVENT } from 'app/enums/DESIGNER_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
import { app } from 'app/main';
import PlayButton from 'app/ui/buttons/PlayButton';
import ResetButton from 'app/ui/buttons/ResetButton';
import StopButton from 'app/ui/buttons/StopButton';
import UIPane from 'app/ui/UIPane';
import IContraption from 'contraptions/interfaces/IContraption';

export default class ContraptionController {

  private __contraption: IContraption;

  public constructor(contraption: IContraption) {
    this.__contraption = contraption;
    EVENT_BUS.subscribe({
      topic: DESIGNER_EVENT.RESET,
      id: ContraptionController.name,
      fn: () => this.__contraption.reset(),
    });
    app.root.$appendChild(new UIPane({ x: 1050, y: 340, width: 400, height: 580}));
    app.root.$appendChild(new PlayButton({ x: 1050, y: 660 }));
    app.root.$appendChild(new StopButton({ x: 1100, y: 660 }));
    app.root.$appendChild(new ResetButton({ x: 1150, y: 660 }));
  }

}