
import LabelComponent from '../../framework/presentation/components/LabelComponent';
import StyleComponent from '../../framework/presentation/components/StyleComponent';
import UIElement from './abstracts/UIElement';

export default abstract class Button extends UIElement {

  public constructor({ x, y, label }: { x: number, y: number, label: string }) {
    super(Object.assign({ width: 40, height: 40 }, arguments[0]));
    if (label) {
      this.$add(LabelComponent)({
        fontSize: 10,
        text: label,
        offset: { x: -10, y: 4 },
      });
    }
  }

  public $enable(): void {
    super.$enable();
    this.$patch(StyleComponent)!({ opacity: 1 });
  }

  public $disable(): void {
    super.$disable();
    this.$patch(StyleComponent)!({ opacity: 0.2 });
  }
}