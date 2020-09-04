import Panel from '../../../ui/Panel';
import PlayButton from '../buttons/PlayButton';
import ResetButton from '../buttons/ResetButton';

export default class ButtonPanel extends Panel {

  public constructor() {
    super(arguments[0]);
    this.add(PlayButton, { x: 1200, y: 30 });
    this.add(ResetButton, { x: 1250, y: 30 });
  }

}