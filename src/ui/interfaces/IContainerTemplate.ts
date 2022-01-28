import { Dict, Tuple } from 'base/types';
import { IPose } from 'foundation/geometry/components/PoseComponent';
import { IShape } from 'foundation/geometry/components/ShapeComponent';
import { IAnimation } from 'foundation/presentation/components/AnimationComponent';
import { IImage } from 'foundation/presentation/components/ImageComponent';
import { ILabel } from 'foundation/presentation/components/LabelComponent';
import { IStyle } from 'foundation/presentation/components/StyleComponent';
import { ComponentTuple } from 'engine/types';
import IPipeEvent from 'engine/interfaces/IPipeEvent';

export default interface IContainerTemplate {
  pose?: IPose;
  shape?: (IShape | { width: number; height: number }) & Dict<any>;
  style?: IStyle;
  label?: ILabel;
  image?: IImage;
  animation?: IAnimation;
  mouse?: {
    events: Dict<Array<ComponentTuple<any>>>;
    pipes: Dict<Array<Tuple<string, IPipeEvent>>>;
    isHovered: boolean;
  };
}