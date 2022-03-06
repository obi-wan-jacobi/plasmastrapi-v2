import LineComponent from 'foundation/geometry/components/LineComponent';
import { IPoint } from 'foundation/geometry/components/PoseComponent';
import UIEntity from 'ui/abstracts/UIEntity';

export default class CursorTrail extends UIEntity {

  public constructor() {
    super({
      style: {
        colour: 'RED',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
    });
    this.$add(LineComponent)({
      path: [],
    });
  }

  public addNewPoint({ x, y }: IPoint): void {
    const { path } = this.$copy(LineComponent)!;
    path.push({ x, y });
    this.$patch(LineComponent)({ path });
  }

}