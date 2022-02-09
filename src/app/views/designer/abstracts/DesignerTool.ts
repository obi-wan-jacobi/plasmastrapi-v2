import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IDesignerTool from '../interfaces/IDesignerTool';
import MouseComponent, { IMouse } from 'html5-canvas/components/MouseComponent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';

export default abstract class DesignerTool<T> implements IDesignerTool<T> {

  public isDisposed = false;

  protected _initiator: IEntity;
  protected _prevInitiatorState: IMouse;
  protected _target?: T;
  protected _prevDefinedMouseEvent?: IMouseEvent;
  protected _isDesignPaletteHovered: boolean;

  public constructor({}: { initiator: IEntity; target?: T; mouseEvent?: IMouseEvent; isDesignPaletteHovered: boolean }) {
    const { initiator, target, mouseEvent, isDesignPaletteHovered } = arguments[0];
    this._initiator = initiator;
    this._prevInitiatorState = (initiator as IEntity).$copy(MouseComponent)!;
    this._target = target;
    this._prevDefinedMouseEvent = mouseEvent;
    this._isDesignPaletteHovered = isDesignPaletteHovered;
  }

  public equip(): void {
    console.log(`Equip ${this.constructor.name}`);
    this.__highlightInitiator();
  }

  public dispose(): void {
    this.__unhighlightInitiator();
    this._target = undefined;
  }

  public [DESIGNER_EVENT.ENABLE](): void {
    this._isDesignPaletteHovered = true;
  }

  public [DESIGNER_EVENT.DISABLE](): void {
    this._isDesignPaletteHovered = false;
  }

  public [MOUSE_EVENT.MOUSE_MOVE]({ mouseEvent }: { mouseEvent: IMouseEvent}): void {
    if (!this._target) {
      return;
    }
    if (this._target && (this._target as unknown as IEntity).$patch) {
      (this._target as unknown as IEntity).$patch(PoseComponent)({ x: mouseEvent.x, y: mouseEvent.y });
    }
    if (mouseEvent) {
      this._prevDefinedMouseEvent = mouseEvent;
    }
  }

  private __highlightInitiator(): void {
    if (this._initiator) {
      this._initiator.$mutate(MouseComponent)({
        events: {
          [MOUSE_EVENT.MOUSE_ENTER]: [[StyleComponent.name, { colour: 'YELLOW' }]],
          [MOUSE_EVENT.MOUSE_LEAVE]: [[StyleComponent.name, { colour: 'YELLOW' }]],
        },
        pipes: {},
        isHovered: false,
      });
    }
  }

  private __unhighlightInitiator(): void {
    this._initiator.$mutate(MouseComponent)(this._prevInitiatorState!);
  }

}