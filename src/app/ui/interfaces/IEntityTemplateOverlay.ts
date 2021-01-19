import { Dict } from 'foundation/types';
import { IPose } from 'framework/geometry/components/PoseComponent';
import { IShape } from 'framework/geometry/components/ShapeComponent';
import { IStyle } from 'framework/presentation/components/StyleComponent';

export default interface IEntityTemplateOverlay {
  pose?: IPose;
  shape?: (IShape | { width: number; height: number }) & Dict<any>;
  style?: {
    default?: IStyle;
    hovered?: IStyle;
  };
}