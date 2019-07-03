import { Component } from './Component';

export interface IPoint { x: number; y: number; }

export interface IPose { x: number; y: number; a: number; }
export class Pose extends Component<IPose> {}

export interface IShape { points: IPoint[]; rendering?: IRenderingProfile; }
export class Shape extends Component<IShape> {}

export interface ILabel { text: string; fontSize: number; offset: { x: number, y: number }; }
export class Label extends Component<ILabel> {}

export interface IRenderingProfile {
    colour: string;
}
export class RenderingProfile extends Component<IRenderingProfile> {}
