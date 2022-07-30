import Entity from 'engine/abstracts/Entity';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import { Void } from 'base/types';
import Dictionary from 'base/data-structures/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import IMouseEvent from './interfaces/IMouseEvent';
import { MOUSE_EVENT } from './enums/MOUSE_EVENT';
import { observable } from './decorators/observable';
import { Ctor } from 'engine/types';
import IComponent from 'engine/interfaces/IComponent';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import { RGBA_0, RGBA_WHITE } from 'app/ui/COLOUR';

export default class HTML5CanvasElement extends Entity implements IHTML5CanvasElement {

  protected _observedMethods: IDictionary<IDictionary<Void<any>>>;

  public constructor() {
    super();
    this._observedMethods = new Dictionary<Dictionary<() => void>>();
    this.$add(PoseComponent, { x: 0, y: 0, a: 0 });
    this.$add(StyleComponent, {
      colour: RGBA_WHITE,
      fill: RGBA_0,
      opacity: 1,
      zIndex: 0,
    });
  }

  public $subscribe({ method, id, callback }: { method: string; id: string; callback: () => void }): void {
    if (!(this as any)[method]) {
      throw new Error(`Method not implemented: ${method}`);
    }
    const subscribers = this._observedMethods.read(method);
    if (subscribers) {
      if (subscribers.read(id)) {
        throw new Error(`ID <${id}> is already subscribed to method <${method}> on ${this.constructor.name}.`);
      }
      subscribers.write({ key: id, value: callback });
      return;
    }
    const innerDictionary = new Dictionary<() => void>();
    innerDictionary.write({ key: id, value: callback });
    this._observedMethods.write({ key: method, value: innerDictionary });
  }

  public $unsubscribe({ method, id }: { method: string; id: string }): void {
    if (!(this as any)[method]) {
      throw new Error(`Method not implemented: ${method}`);
    }
    const subscribers = this._observedMethods.read(method);
    if (!subscribers) {
      console.warn(`ID <${id}> is not subscribed to method <${method}> on ${this.constructor.name}.`);
      return;
      // throw new Error(`ID <${id}> is not subscribed to method <${method}> on ${this.constructor.name}.`);
    }
    subscribers.delete(id);
  }

  @observable
  public $patch<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg | {}): this {
    return super.$patch(ComponentClass, data);
  }

  @observable
  [MOUSE_EVENT.MOUSE_DOWN](event: IMouseEvent): void {
    console.log(event.name);
  }

  @observable
  [MOUSE_EVENT.MOUSE_UP](event: IMouseEvent): void {
    console.log(event.name);
  }

  @observable
  [MOUSE_EVENT.CLICK](event: IMouseEvent): void {
    console.log(event.name);
  }

  @observable
  [MOUSE_EVENT.MOUSE_MOVE](event: IMouseEvent): void {
    console.log(event.name);
  }

  @observable
  [MOUSE_EVENT.MOUSE_ENTER](event: IMouseEvent): void {
    console.log(event.name);
  }

  @observable
  [MOUSE_EVENT.MOUSE_LEAVE](event: IMouseEvent): void {
    console.log(event.name);
  }

  @observable
  public $destroy(): void {
    super.$destroy();
  }
}
