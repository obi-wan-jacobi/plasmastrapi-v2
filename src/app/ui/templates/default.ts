import clone from 'foundation/helpers/clone';
import { IStrictStyle } from 'framework/presentation/components/StyleComponent';
import IEntityTemplate from '../interfaces/IEntityTemplate';

const style: IStrictStyle = {
  colour: 'WHITE ',
  opacity: 1,
  fill: 'rgba(0,0,0,0)',
  zIndex: 1,
};

const template: IEntityTemplate = {
  pose: { x: 0, y: 0, a: 0 },
  shape: { vertices: [
    { x: 10, y: 10 },
    { x: -10, y: 10 },
    { x: -10, y: -10 },
    { x: 10, y: -10 },
  ]},
  style: {
    default: style,
    hovered: style,
  },
};

export default function newEntityTemplate(): IEntityTemplate {
  return clone(template);
}