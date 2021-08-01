import { IPose } from 'bootstrap/geometry/components/PoseComponent';
import { IShape } from 'bootstrap/geometry/components/ShapeComponent';
import { IAnimation } from 'bootstrap/presentation/components/AnimationComponent';
import { IImage } from 'bootstrap/presentation/components/ImageComponent';
import { ILabel } from 'bootstrap/presentation/components/LabelComponent';
import { IStyle } from 'bootstrap/presentation/components/StyleComponent';

export default interface IContainer {
  pose?: IPose;
  shape?: IShape;
  style?: IStyle;
  mouse?: { isHovered: boolean };
  label?: ILabel;
  image?: IImage;
  animation?: IAnimation;
}