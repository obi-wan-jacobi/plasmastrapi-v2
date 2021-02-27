import UIEntity from 'app/ui/abstracts/UIEntity';

export default class DesignerConsole extends UIEntity {

  public constructor() {
    super({
      pose: { x: 400, y: 340, a: 0 },
      shape: { width: 800, height: 560 },
    });
  }

}
