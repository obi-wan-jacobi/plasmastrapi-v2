import { IPoint } from './PoseComponent';
import { Component } from 'src/engine/abstracts/Component';

export interface IShape { points: IPoint[]; }
export class ShapeComponent extends Component<IShape> {}
