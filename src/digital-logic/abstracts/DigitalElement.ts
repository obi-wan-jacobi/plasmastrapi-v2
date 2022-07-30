import { DIGITAL_STATE } from 'digital-logic/enums/DIGITAL_STATE';
import Wire from 'digital-logic/wires/Wire';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default abstract class DigitalElement extends HTML5CanvasElement {

  private __state = DIGITAL_STATE.OFF;
  private __nextState = DIGITAL_STATE.OFF;

  public constructor({ x, y }: IPoint) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
  }

  public high(): void {
    this.__nextState = DIGITAL_STATE.HIGH;
  }

  public low(): void {
    this.__nextState = DIGITAL_STATE.LOW;
  }

  public off(): void {
    this.__nextState = DIGITAL_STATE.OFF;
  }

  public next(): void {
    this.__state = this.__nextState;
  }

  public get isHigh(): boolean {
    return this.__state === DIGITAL_STATE.HIGH;
  }

  public get isLow(): boolean {
    return this.__state === DIGITAL_STATE.LOW;
  }

  public get isOff(): boolean {
    return this.__state === DIGITAL_STATE.OFF;
  }

  public abstract compute(): void;

  public $patch<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg | {}): this {
    super.$patch(ComponentClass, data);
    if (ComponentClass.name === PoseComponent.name) {
      this.$children.filter((child) => child instanceof Wire)
        .forEach((wire) => (wire as Wire).updatePose());
    }
    return this;
  }

  protected get _inputs(): Wire[] {
    return this.$children.filter((child: Wire) => {
      return child instanceof Wire && child.output.$parent === this;
    }) as Wire[];
  }

}