import { IPoint } from 'framework/geometry/components/PoseComponent';
import Panel from '../../../ui/Panel';
import PlayButton from '../buttons/PlayButton';
import ResetButton from '../buttons/ResetButton';

export default class ButtonPanel extends Panel {

  public constructor({ play, reset }: { play: IPoint; reset: IPoint }) {
    super(arguments[0]);
    this.appendChild(PlayButton, play);
    this.appendChild(ResetButton, reset);
  }

}
