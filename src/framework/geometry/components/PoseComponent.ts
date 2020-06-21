import { Component } from 'src/engine/abstracts/Component';

export interface IPoint { x: number; y: number; }
export interface IPose extends IPoint { a: number; }
export class PoseComponent extends Component<IPose> {}
