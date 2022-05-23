import Component from 'engine/abstracts/Component';
import { IPoint } from './PoseComponent';

export interface IPose extends IPoint { a: number }

export default class RelativePoseComponent extends Component<IPose> { }
