import { IPose } from 'foundation/geometry/components/PoseComponent';
import { IShape } from 'foundation/geometry/components/ShapeComponent';
import { IAnimation } from 'foundation/presentation/components/AnimationComponent';
import { IImage } from 'foundation/presentation/components/ImageComponent';
import { ILabel } from 'foundation/presentation/components/LabelComponent';
import { IStyle } from 'foundation/presentation/components/StyleComponent';
import { Dict, Tuple } from 'base/types';

export default interface IContainer {
  pose?: IPose;
  shape?: IShape;
  style?: IStyle;
  mouse?: { events: Dict<Array<Tuple<string, any>>>; isHovered: boolean };
  label?: ILabel;
  image?: IImage;
  animation?: IAnimation;
}