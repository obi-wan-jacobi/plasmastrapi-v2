import Entity from 'engine/abstracts/Entity';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import { Dict, Volatile } from 'base/types';
import Dictionary from 'base/concretes/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import OffsetComponent from './components/OffsetComponent';
import IMouseEvent from './interfaces/IMouseEvent';
import { MOUSE_EVENT } from './enums/MOUSE_EVENT';

export function observable({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = { [fn.name]() {
    const result = fn.apply(this, arguments);
    const subscribers = this.__observedMethods.read(fn.name);
    if (subscribers) {
      subscribers.forEach((fn: () => void) => fn());
    }
    return result;
  }}[fn.name];
}

export function hereditary({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  //https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
  descriptor.value = { [fn.name]() {
    this.__children.forEach((child: IHTML5CanvasElement) => (child as Dict<any>)[fn.name](...arguments));
    fn.apply(this, arguments);
  }}[fn.name];
}

export default class HTML5CanvasElement extends Entity implements IHTML5CanvasElement {

  private __parent: Volatile<IHTML5CanvasElement>;
  private __children: IDictionary<IHTML5CanvasElement> = new Dictionary();
  private __observedMethods = new Dictionary<Dictionary<() => void>>();

  public get $parent(): Volatile<IHTML5CanvasElement> {
    return this.__parent;
  }

  public set $parent(parent: Volatile<IHTML5CanvasElement>) {
    if (this.__parent) {
      this.__parent.$removeChild(this);
    }
    this.__parent = parent;
  }

  public get $children(): IDictionary<IHTML5CanvasElement> {
    return this.__children;
  }

  public $subscribe({ method, id, callback }: { method: string; id: string; callback: () => void }): void {
    if (!(this as any)[method]) {
      throw new Error(`Method not implemented: ${method}`);
    }
    const subscribers = this.__observedMethods.read(method);
    if (subscribers) {
      if (subscribers.read(id)) {
        throw new Error(`ID <${id}> is already subscribed to method <${method}> on ${this.constructor.name}.`);
      }
      subscribers.write({ key: id, value: callback });
      return;
    }
    const innerDictionary = new Dictionary<() => void>();
    innerDictionary.write({ key: id, value: callback });
    this.__observedMethods.write({ key: method, value: innerDictionary });
  }

  public $unsubscribe({ method, id }: { method: string; id: string }): void {
    if (!(this as any)[method]) {
      throw new Error(`Method not implemented: ${method}`);
    }
    const subscribers = this.__observedMethods.read(method);
    if (!subscribers) {
      throw new Error(`ID <${id}> is not subscribed to method <${method}> on ${this.constructor.name}.`);
    }
    subscribers.delete(id);
  }

  public $appendChild<T extends IHTML5CanvasElement>(child: T): T {
    this.__children.write({ key: child.$id, value: child });
    if (child.$parent) {
      throw new Error(
        `${child.constructor.name} already has a parent: ${child.$parent.constructor.name}`
      );
    }
    (child as unknown as HTML5CanvasElement).$parent = this;
    return child;
  }

  public $removeChild<T extends IHTML5CanvasElement>(child: T): T {
    this.__children.delete(child.$id);
    return child;
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

  @hereditary
  @observable
  public $destroy(): void {
    super.$destroy();
  }

  @hereditary
  public $moveTo({ x, y }: { x: number; y: number }): void {
    const offset = this.$copy(OffsetComponent);
    if (offset) {
      x += offset.xOffset;
      y += offset.yOffset;
    }
    this.$patch(PoseComponent)({ x, y });
  }
}
