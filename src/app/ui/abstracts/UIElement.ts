import InteractiveEntity from '../../../framework/interactive/InteractiveEntity';
import ShapeComponent from '../../../framework/geometry/components/ShapeComponent';
import StyleComponent from '../../../framework/presentation/components/StyleComponent';
import ImageComponent from '../../../framework/presentation/components/ImageComponent';


export default abstract class UIElement extends InteractiveEntity {

  public constructor({ x, y, width, height, src }: { x: number, y: number, width: number, height: number, src: string }) {
    super(Object.assign({ a: 0 }, arguments[0]));
    this.$add(ShapeComponent)({
      points: [
        { x: width / 2, y: height / 2 },
        { x: -width / 2, y: height / 2 },
        { x: -width / 2, y: -height / 2 },
        { x: width / 2, y: -height / 2 },
      ]
    });
    this.$add(StyleComponent)({ colour: 'WHITE' });
    if (src) {
      this.$add(ImageComponent)({ src });
    }
  }

  public $mouseenter(): void {/**/ }
  public $mousemove(): void {/**/ }
  public $mouseleave(): void {/**/ }
  public $mousedown(): void {/**/ }
  public $mouseup(): void {/**/ }
  public $click(): void {/**/ }
}