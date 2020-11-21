import ButtonPanel from './panels/ButtonPanel';
import Panel from '../../ui/Panel';

export default class PlayerConsole extends Panel {

  public constructor() {
    super(arguments[0]);
    this.appendChild(ButtonPanel, {
      play: { x: 1200, y: 30 },
      reset: { x: 1250, y: 30 },
    });
    this.appendChild(Panel, {
      x: 1040, y: 340,
      width: 440,
      height: 560,
    });
  }
}
