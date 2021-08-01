import { Dict } from 'core/types';
import { IPose } from 'bootstrap/geometry/components/PoseComponent';
import { IShape } from 'bootstrap/geometry/components/ShapeComponent';
import { IAnimation } from 'bootstrap/presentation/components/AnimationComponent';
import { IImage } from 'bootstrap/presentation/components/ImageComponent';
import { ILabel } from 'bootstrap/presentation/components/LabelComponent';
import { IStyle } from 'bootstrap/presentation/components/StyleComponent';

export default interface IContainerTemplate {
  pose?: IPose;
  shape?: (IShape | { width: number; height: number }) & Dict<any>;
  style?: IStyle;
  label?: ILabel;
  image?: IImage;
  animation?: IAnimation;
}