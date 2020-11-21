import InteractiveComponent from './InteractiveComponent';
import Entity from 'engine/Entity';
import IAdaptedMouseEvent from 'engine/interfaces/IAdaptedMouseEvent';

export default abstract class InteractiveEntity extends Entity {

  public constructor() {
    super();
    this.$add(InteractiveComponent)({
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
    this.$patch(InteractiveComponent)({ isEnabled: true });
  }

  public $disable(): void {
    this.$patch(InteractiveComponent)({ isEnabled: false });
  }

  public abstract $mouseenter(e: IAdaptedMouseEvent): void;

  public abstract $mouseleave(e: IAdaptedMouseEvent): void;

  public abstract $mousemove(e: IAdaptedMouseEvent): void;

  public abstract $mousedown(e: IAdaptedMouseEvent): void;

  public abstract $mouseup(e: IAdaptedMouseEvent): void;

  public abstract $click(e: IAdaptedMouseEvent): void;
}
