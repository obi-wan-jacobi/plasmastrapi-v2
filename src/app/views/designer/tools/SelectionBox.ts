import { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import UIEntity from 'ui/abstracts/UIEntity';

export default class SelectionBox extends UIEntity {

  private __start: IPoint;

  public constructor({ x, y} : { x: number; y: number }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 0,
        height: 0,
      },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
    });
    this.__start = { x, y };
  }

  public stretchTo({ x, y }: IPoint): void {
    const vertices = [
      { x: this.__start.x, y: this.__start.y },
      { x: this.__start.x, y: this.__start.y + y },
      { x: this.__start.x + x, y: this.__start.y + y },
      { x: this.__start.x + x, y: this.__start.y },
    ];
    this.$patch(ShapeComponent)({ vertices });
  }
}