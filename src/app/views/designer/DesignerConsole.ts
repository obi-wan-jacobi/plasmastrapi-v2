import UIEntity from 'ui/abstracts/UIEntity';
import UIButton from 'ui/UIButton';

export default class DesignerConsole extends UIEntity {

  public constructor() {
    super({
      pose: { x: 400, y: 340, a: 0 },
      shape: { width: 800, height: 560 },
      style: {
        colour: 'WHITE',
        opacity: 1,
        fill: 'rgba(0,0,0,0)',
      },
    });
    this.$appendChild(new UIButton({
      x: 25, y: 25, text: 'hello', src: '',
    }));
  }

}
