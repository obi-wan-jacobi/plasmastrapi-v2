import UIEntity from 'app/ui/abstracts/UIEntity';

export default class PlayerConsole extends UIEntity {

  public constructor() {
    super(arguments[0]);
    this.$appendChild(new UIEntity({
      pose: { x: 1040, y: 340, a: 0 },
      shape: {
        width: 440,
        height: 560,
      },
    }));
  }
}
