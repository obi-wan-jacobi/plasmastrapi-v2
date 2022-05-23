import { RGBA_0 } from 'app/ui/COLOUR';
import { ENTITIES } from 'engine/concretes/EntityMaster';
import IEntity from 'engine/interfaces/IEntity';
import { EntityClass } from 'engine/types';
import PoseComponent, { IPoint } from 'foundation/geometry/components/PoseComponent';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import StyleComponent from 'foundation/presentation/components/StyleComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class SelectionBox<T extends IEntity> extends HTML5CanvasElement {

  public selections: Set<T> = new Set();

  private __start: IPoint;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private __SelectionType: EntityClass<T>;

  public constructor({ x, y, SelectionType } : { x: number; y: number; SelectionType: EntityClass<T> }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
    const width = 2, height = 2;
    this.$add(ShapeComponent, {
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
    this.$add(StyleComponent, {
      colour: 'WHITE',
      fill: RGBA_0,
      opacity: 1,
      zIndex: 2,
    });
    this.__start = { x, y };
    this.__SelectionType = SelectionType;
    this.__getSelections();
  }

  public stretchTo({ x, y }: IPoint): void {
    const dx = (x - this.__start.x) / 2;
    const dy = (y - this.__start.y) / 2;
    this.$patch(PoseComponent, {
      x: this.__start.x + dx,
      y: this.__start.y + dy,
    });
    const vertices = [
      { x: -dx, y: -dy },
      { x: -dx, y: dy },
      { x: dx, y: dy },
      { x: dx, y: -dy },
    ];
    this.$patch(ShapeComponent, { vertices });
    this.__getSelections();
  }

  private __getSelections(): void {
    ENTITIES.forEvery(this.__SelectionType)((selection) => {
      if (!selection.$copy(PoseComponent)) {
        return;
      }
      if (entitiesTouch(this, selection)) {
        this.selections.add(selection);
        return;
      }
    });
  }
}