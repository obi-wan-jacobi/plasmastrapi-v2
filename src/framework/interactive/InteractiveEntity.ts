import InteractiveComponent from './InteractiveComponent';
import Entity from 'engine/Entity';
import IMouseEvent from 'engine/interfaces/IMouseEvent';

export default abstract class InteractiveEntity extends Entity {

  public constructor() {
    super();
    this.$add(InteractiveComponent)({
      transform: undefined,
      isEnabled: true,
      isHovered: false,
      mouseenter: this.$mouseenter,
      mouseleave: this.$mouseleave,
      mousemove: this.$mousemove,
      mousedown: this.$mousedown,
      mouseup: this.$mouseup,
      click: this.$click,
    });
  }

  public $enable(): void {
    this.$patch(InteractiveComponent)({ transform: 'enable' });
  }

  public $disable(): void {
    this.$patch(InteractiveComponent)({ transform: 'disable' });
  }

  public abstract $mouseenter(e: IMouseEvent): void;

  public abstract $mouseleave(e?: IMouseEvent): void;

  public abstract $mousemove(e: IMouseEvent): void;

  public abstract $mousedown(e: IMouseEvent): void;

  public abstract $mouseup(e: IMouseEvent): void;

  public abstract $click(e: IMouseEvent): void;
}
