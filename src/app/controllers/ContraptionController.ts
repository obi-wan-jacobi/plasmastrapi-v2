import { DESIGNER_EVENT } from 'app/enums/DESIGNER_EVENT';
import EVENT_BUS from 'app/EVENT_BUS';
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
  }

}