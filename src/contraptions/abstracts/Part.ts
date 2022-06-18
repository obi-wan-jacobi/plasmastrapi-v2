import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

export default class Part extends HTML5CanvasElement {

  public $add<T>(ComponentClass: Ctor<IComponent<T>, T>, data: T | any): void {
    super.$add(ComponentClass, data);
  }

  public $appendChild<T extends IHTML5CanvasElement>(child: T): T {
    super.$appendChild(child);
    return child;
  }

}