import Panel from '../../../ui/Panel';
import ToolButton from '../buttons/ToolButton';

export default class ToolButtonPanel extends Panel {

  public constructor() {
    super(arguments[0]);
    this.__initButtons();
  }

  private __initButtons(): void {
    this.add(ToolButton, { x: 30, y: 30 });
    this.add(ToolButton, { x: 80, y: 30 });
    this.add(ToolButton, { x: 130, y: 30 });
    this.add(ToolButton, { x: 180, y: 30 });
    this.add(ToolButton, { x: 720, y: 30 });
    this.add(ToolButton, { x: 770, y: 30 });
  }
}