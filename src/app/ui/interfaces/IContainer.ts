import { IPose } from 'framework/geometry/components/PoseComponent';
import { IShape } from 'framework/geometry/components/ShapeComponent';
import { IAnimation } from 'framework/presentation/components/AnimationComponent';
import { IImage } from 'framework/presentation/components/ImageComponent';
import { ILabel } from 'framework/presentation/components/LabelComponent';
import { IStyle } from 'framework/presentation/components/StyleComponent';

export default interface IContainer {
  pose?: IPose;
  shape?: IShape;
  style?: IStyle;
  mouse?: { isHovered: boolean };
  label?: ILabel;
  image?: IImage;
  animation?: IAnimation;
}