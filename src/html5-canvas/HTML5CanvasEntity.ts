import Entity from 'engine/abstracts/Entity';
import IHTML5CanvasEntity from 'html5-canvas/interfaces/IHTML5CanvasEntity';
import { Dict, Volatile } from 'base/types';
import Dictionary from 'base/concretes/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import OffsetComponent from './components/OffsetComponent';

export function hereditary({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function(): void {
    this.__children.forEach((child: IHTML5CanvasEntity) => (child as Dict<any>)[fn.name](...arguments));
    fn.apply(this, arguments);
  };
}

export default abstract class HTML5CanvasEntity extends Entity implements IHTML5CanvasEntity {

  private __parent: Volatile<IHTML5CanvasEntity>;
  private __children: IDictionary<IHTML5CanvasEntity> = new Dictionary();

  public get $parent(): Volatile<IHTML5CanvasEntity> {
    return this.__parent;
  }

  public set $parent(parent: Volatile<IHTML5CanvasEntity>) {
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
