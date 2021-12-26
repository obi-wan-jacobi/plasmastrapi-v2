import Tool from './Tool';
import StyleComponent from 'foundation/presentation/components/StyleComponent';

export default class DestructorTool extends Tool {

  constructor({}: { x: number; y: number }) {
    super(arguments[0]);
    this.$patch(StyleComponent)({ colour: 'ORANGE' });
  }

  // public $mouseup(e: IMouseEvent): void {
  //   super.$mouseup(e);
  //   const target = this._$master.find(DigitalElement)((element) => {
  //     return entityContainsPoint(element, e);
  //   });
  //   if (target) {
  //     target.$destroy();
  //   }
  // }
}
