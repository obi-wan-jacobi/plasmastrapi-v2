
import { Constructor, Optional } from '../../foundation/types';
import UIElement from './abstracts/UIElement';

export default class Panel extends UIElement {

  private __children: UIElement[] = [];

  public add<T extends UIElement, TArg extends {}>(UIElementCtor: Constructor<T, Optional<TArg>>, arg?: TArg): void {
    const element = this.$master.entities.create(UIElementCtor, arg);
    this.__children.push(element);
  }

  public $enable(): void {
    super.$enable();
    this.__children.forEach(child => child.$enable());
  }

  public $disable(): void {
    super.$disable();
    this.__children.forEach(child => child.$disable());
  }

  public $destroy(): void {
    super.$destroy();
    this.__children.forEach(child => child.$destroy());
  }

}