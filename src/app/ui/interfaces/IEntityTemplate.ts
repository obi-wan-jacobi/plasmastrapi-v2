import { IPose } from 'framework/geometry/components/PoseComponent';
import { IShape } from 'framework/geometry/components/ShapeComponent';
import { IHTML5Style } from 'html5-canvas/components/HTML5StyleComponent';

export default interface IEntityTemplate {
  pose: IPose;
  shape: IShape;
  style: IHTML5Style;
}