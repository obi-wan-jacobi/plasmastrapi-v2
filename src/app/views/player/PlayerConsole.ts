import UIPanel from '../../ui/UIPanel';

export default class PlayerConsole extends UIPanel {

  public constructor() {
    super(arguments[0]);
    // this.$appendChild(new ButtonPanel({
    //   play: { x: 1200, y: 30 },
    //   reset: { x: 1250, y: 30 },
    // }));
    this.$appendChild(new UIPanel({
      pose: { x: 1040, y: 340, a: 0 },
      shape: {
        width: 440,
        height: 560,
      },
    }));
  }
}
