import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import UIEntity from 'ui/abstracts/UIEntity';

export default class SelectionBox extends UIEntity {

  private __start: IPoint;

  public constructor({ x, y } : { x: number; y: number }) {
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
    const dx = (x - this.__start.x) / 2;
    const dy = (y - this.__start.y) / 2;
    this.$patch(PoseComponent)({
      x: this.__start.x + dx,
      y: this.__start.y + dy,
    });
    const vertices = [
      { x: -dx, y: -dy },
      { x: -dx, y: dy },
      { x: dx, y: dy },
      { x: dx, y: -dy },
    ];
    this.$patch(ShapeComponent)({ vertices });
  }
}