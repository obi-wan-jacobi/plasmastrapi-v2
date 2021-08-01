import { Dict } from 'foundation/types';
import { IPose } from 'framework/geometry/components/PoseComponent';
import { IShape } from 'framework/geometry/components/ShapeComponent';
import { IAnimation } from 'framework/presentation/components/AnimationComponent';
import { IImage } from 'framework/presentation/components/ImageComponent';
import { ILabel } from 'framework/presentation/components/LabelComponent';
import { IStyle } from 'framework/presentation/components/StyleComponent';

export default interface IContainerTemplate {
  pose?: IPose;
  shape?: (IShape | { width: number; height: number }) & Dict<any>;
  style?: IStyle;
  label?: ILabel;
  image?: IImage;
  animation?: IAnimation;
}