import Entity from 'engine/abstracts/Entity';
import IHTML5CanvasEntity from 'html5-canvas/interfaces/IHTML5CanvasEntity';
import { Dict } from 'foundation/types';
import Dictionary from 'foundation/concretes/Dictionary';
import IDictionary from 'foundation/interfaces/IDictionary';

export function hereditary({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function(): void {
    this.__children.forEach((child: IHTML5CanvasEntity) => (child as Dict<any>)[fn.name](...arguments));
  };
}

export default abstract class HTML5CanvasEntity extends Entity implements IHTML5CanvasEntity {

  private __parent: IHTML5CanvasEntity | undefined;
  private __children: IDictionary<IHTML5CanvasEntity> = new Dictionary();

  public get $parent(): IHTML5CanvasEntity | undefined {
    return this.__parent;
  }

  public set $parent(parent: IHTML5CanvasEntity | undefined) {
    if (this.__parent) {
      this.__parent.$removeChild(this);
    }
    this.__parent = parent;
  }

  public get $children(): IDictionary<IHTML5CanvasEntity> {
    return this.__children;
  }

  public $appendChild<T extends IHTML5CanvasEntity>(child: T): T {
    this.__children.write({ key: child.id, value: child });
    if (child.$parent) {
      throw new Error(
        `${child.constructor.name} already has a parent: ${child.$parent.constructor.name}`
      );
    }
    (child as unknown as HTML5CanvasEntity).$parent = this;
    return child;
  }

  public $removeChild<T extends IHTML5CanvasEntity>(child: T): T {
    this.__children.delete(child.id);
    return child;
  }

  @hereditary
  public $destroy(): void {
    super.$destroy();
    this.$parent = undefined;
  }
}
