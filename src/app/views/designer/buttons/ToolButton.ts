import UIButton from 'ui/UIButton';

export default class ToolButton extends UIButton {

  public constructor({ x, y, text, src }: { x: number; y: number; text?: string; src?: string }) {
    super({ x, y, text, src });
  }

}