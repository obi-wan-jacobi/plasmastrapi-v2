import UIEntity from './abstracts/UIEntity';
import { Constructor, Optional } from 'foundation/types';
import IUIContainer from './interfaces/IUIContainer';
import IUIEntity from './interfaces/IUIEntity';

export default class Panel extends UIEntity implements IUIContainer {

  private __children: IUIEntity[] = [];

  public appendChild<T extends IUIEntity, TArg extends {}>(UIElementCtor: Constructor<T, Optional<TArg>>, arg?: TArg): void {
    const element = this._$master.create(UIElementCtor, arg);
    this.__children.push(element);
  }

  public $enable(): void {
    super.$enable();
    this.__children.forEach((child) => child.$enable());
  }

  public $disable(): void {
    super.$disable();
    this.__children.forEach((child) => child.$disable());
  }

  public $destroy(): void {
    super.$destroy();
    this.__children.forEach((child) => child.$destroy());
  }

}
