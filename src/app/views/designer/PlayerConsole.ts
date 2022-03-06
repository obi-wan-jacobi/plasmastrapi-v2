import StartButton from 'app/StartButton';
import StopButton from 'app/StopButton';
import UIEntity from 'ui/abstracts/UIEntity';

export default class PlayerConsole extends UIEntity {

  public constructor() {
    super(arguments[0]);
    this.$appendChild(new UIEntity({
      pose: { x: 1040, y: 340, a: 0 },
      shape: {
        width: 440,
        height: 560,
      },
      style: {
        colour: 'WHITE',
        opacity: 1,
        fill: 'rgba(0,0,0,0)',
        zIndex: 0,
      },
    }));
    this.$appendChild(new StartButton({ x: 1040, y: 650 }));
    this.$appendChild(new StopButton({ x: 990, y: 650 }));
  }
}
