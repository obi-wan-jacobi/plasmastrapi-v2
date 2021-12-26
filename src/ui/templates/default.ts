import clone from 'base/helpers/clone';
import { IStyle } from 'foundation/presentation/components/StyleComponent';
import IContainer from '../interfaces/IContainer';

const style: IStyle = {
  colour: 'WHITE',
  opacity: 1,
  fill: 'rgba(0,0,0,0)',
  zIndex: 0,
};

const template: IContainer = {
  pose: { x: 0, y: 0, a: 0 },
  shape: {
    vertices: [
      { x: 10, y: 10 },
      { x: -10, y: 10 },
      { x: -10, y: -10 },
      { x: 10, y: -10 },
    ],
  },
  style,
  mouse: {
    events: {},
    isHovered: false,
  },
};

export default function newContainerTemplate(): IContainer {
  return clone(template);
}