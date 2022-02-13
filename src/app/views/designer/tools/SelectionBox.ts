import { ENTITIES } from 'engine/concretes/EntityMaster';
import IEntity from 'engine/interfaces/IEntity';
import { Etor } from 'engine/types';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import UIEntity from 'ui/abstracts/UIEntity';

export default class SelectionBox<T extends IEntity> extends UIEntity {

  public selections: Set<T>;

  private __start: IPoint;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __SelectionType: Etor<T, any>;

  public constructor({ x, y, SelectionType } : { x: number; y: number; SelectionType: Etor<T, any> }) {
    super({
      pose: { x, y, a: 0 },
      shape: {
        width: 1,
        height: 1,
      },
      style: {
        colour: 'WHITE',
        fill: 'rgba(0,0,0,0)',
        opacity: 1,
        zIndex: 0,
      },
    });
    this.__start = { x, y };
    this.__SelectionType = SelectionType;
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
    this.__getSelections();
  }

  private __getSelections(): void {
    this.selections = new Set();
    ENTITIES.forEvery(this.__SelectionType)((selection) => {
      if (entitiesTouch(this, selection)) {
        this.selections.add(selection);
        return;
      }
    });
  }
}