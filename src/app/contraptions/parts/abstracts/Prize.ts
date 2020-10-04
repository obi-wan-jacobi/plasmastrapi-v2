import Entity from '../../../../engine/Entity';
import PoseComponent from '../../../../framework/geometry/components/PoseComponent';
import ShapeComponent, { IShape } from '../../../../framework/geometry/components/ShapeComponent';
import StyleComponent from '../../../../framework/presentation/components/StyleComponent';

export default class MachineTarget extends Entity {

  public constructor({ x, y, a, shape }: { x: number, y: number, a?: number, shape: IShape }) {
    super(arguments[0]);
    this.$add(PoseComponent)({ x, y, a: a || 0 });
    this.$add(ShapeComponent)(shape);
    this.$add(StyleComponent)({ colour: 'WHITE' });
  }
}