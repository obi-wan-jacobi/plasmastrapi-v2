import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import StyleComponent, { IStyle } from 'foundation/presentation/components/StyleComponent';
import { MOUSE_EVENT } from 'html5-canvas/enums/MOUSE_EVENT';
import IMouseEvent from 'html5-canvas/interfaces/IMouseEvent';
import IDesignerTool from '../interfaces/IDesignerTool';
import MouseComponent, { IMouse } from 'html5-canvas/components/MouseComponent';
import { DESIGNER_EVENT } from '../enums/DESIGNER_EVENT';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import Gate from 'digital-logic/entities/Gate';

export default abstract class DesignerTool<T> implements IDesignerTool<T> {

  public get isDisposed(): boolean {
    return this.__isDisposed;
  }

  public set isDesignerPaletteHovered(value: boolean) {
    this._isDesignerPaletteHovered = value;
  }

  protected _initiator: IEntity;
  protected _prevInitiatorStyle: IStyle;
  protected _prevInitiatorMouse: IMouse;
  protected _target?: T;
  protected _prevDefinedMouseEvent?: IMouseEvent;
  protected _isDesignerPaletteHovered: boolean;

  private __isDisposed = false;

  public constructor({}: { initiator?: IEntity; target?: T; mouseEvent?: IMouseEvent; isDesignPaletteHovered: boolean }) {
    const { initiator, target, mouseEvent, isDesignPaletteHovered } = arguments[0];
    this._initiator = initiator;
    if (this._initiator) {
      this._prevInitiatorStyle = (initiator as IEntity).$copy(StyleComponent)!;
      this._prevInitiatorMouse = (initiator as IEntity).$copy(MouseComponent)!;
    }
    this._target = target;
    this._prevDefinedMouseEvent = mouseEvent;
    this._isDesignerPaletteHovered = isDesignPaletteHovered;
  }

  public equip(): void {
    console.log(`Equip ${this.constructor.name}`);
    this.__highlightInitiator();
  }

  public dispose(): void {
    this.__resetInitiator();
    this.__resetEntityMouseEvents();
    this._target = undefined;
    this.__isDisposed = true;
  }

  public [DESIGNER_EVENT.ENABLE](): void {
    this._isDesignerPaletteHovered = true;
  }

  public [DESIGNER_EVENT.DISABLE](): void {
    this._isDesignerPaletteHovered = false;
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
    if (!this._initiator) {
      return;
    }
    this._initiator.$patch(StyleComponent)({
      colour: 'YELLOW',
    });
    this._initiator.$mutate(MouseComponent)({
      events: {},
      pipes: {},
      isHovered: false,
    });
  }

  private __resetInitiator(): void {
    if (!this._initiator) {
      return;
    }
    this._initiator.$mutate(StyleComponent)(this._prevInitiatorStyle);
    this._initiator.$mutate(MouseComponent)(this._prevInitiatorMouse);
  }

  private __resetEntityMouseEvents(): void {
    ENTITIES.forEvery(Gate)((gate: Gate) => {
      gate.$mutate(MouseComponent)({
        events: {},
        pipes: {},
        isHovered: false,
      });
    });
  }

}