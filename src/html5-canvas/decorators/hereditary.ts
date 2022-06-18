import { Dict } from 'base/types';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

// propagate method call to all children
export function hereditary({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  //https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
  descriptor.value = { [fn.name]() {
    if (!this._children) {
      throw new Error(`${this.constructor.name} is missing a lineage!`);
    }
    fn.apply(this, arguments);
    this._children.forEach((child: IHTML5CanvasElement) => (child as Dict<any>)[fn.name](...arguments));
  }}[fn.name];
}