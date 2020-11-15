import { IPose } from 'framework/geometry/components/PoseComponent';
import { IShape } from 'framework/geometry/components/ShapeComponent';
import { IImage } from 'framework/presentation/components/ImageComponent';
import { ILabel } from 'framework/presentation/components/LabelComponent';
import { IStyle } from 'framework/presentation/components/StyleComponent';

export default interface IEntityTemplate {
  pose: IPose;
  shape?: IShape;
  style?: IStyle;
  label?: ILabel;
  image?: IImage;
}
