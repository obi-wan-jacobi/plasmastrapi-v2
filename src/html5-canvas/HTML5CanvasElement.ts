/* eslint-disable no-extra-boolean-cast */
import Entity from 'engine/abstracts/Entity';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import { Dict, Volatile } from 'base/types';
import Dictionary from 'base/concretes/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import IMouseEvent from './interfaces/IMouseEvent';
import { MOUSE_EVENT } from './enums/MOUSE_EVENT';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import RelativePoseComponent from 'foundation/geometry/components/RelativePoseComponent';
import clone from 'base/helpers/clone';

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
    fn.apply(this, arguments);
    this.__children.forEach((child: IHTML5CanvasElement) => (child as Dict<any>)[fn.name](...arguments));
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
      console.warn(`${child.constructor.name} already has a parent: ${child.$parent.constructor.name}`);
      // throw new Error(
      //   `${child.constructor.name} already has a parent: ${child.$parent.constructor.name}`
      // );
    }
    (child as unknown as HTML5CanvasElement).$parent = this;
    const parentPose = this.$copy(PoseComponent);
    const relativeChildPose = child.$copy(RelativePoseComponent);
        if (!!parentPose && !!relativeChildPose) {
          child.$add(PoseComponent, {
            x: parentPose.x + relativeChildPose.x,
            y: parentPose.y + relativeChildPose.y,
            a: parentPose.a + relativeChildPose.a,
          });
        }
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
    this.$parent?.$removeChild(this);
    super.$destroy();
  }

  public $patch<T extends IComponent<any>>(ComponentClass: Ctor<T, any>, data: T | any): void {
    if (ComponentClass.name === PoseComponent.name) {
        const relativePose = this.$copy(RelativePoseComponent);
        if (!!this.$parent && relativePose) {
          if (!!data.x) data.x += relativePose.x;
          if (!!data.y) data.y += relativePose.y;
          if (!!data.a) data.a += relativePose.a;
        }
        this.$children.forEach((child) => child.$patch(PoseComponent, clone(data)));
      }
    super.$patch(ComponentClass, data);
  }
}
