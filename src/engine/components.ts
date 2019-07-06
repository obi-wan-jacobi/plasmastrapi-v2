import { Component } from './Component';

export interface IPoint { x: number; y: number; }

export interface IPose { x: number; y: number; a: number; }
export class Pose extends Component<IPose> {}

export interface IShape { points: IPoint[]; rendering?: IShapeRenderingProfile; }
export class Shape extends Component<IShape> {}

export interface ILabel { text: string; fontSize: number; offset: { x: number, y: number }; }
export class Label extends Component<ILabel> {}

export interface IShapeRenderingProfile {
    colour: string;
    opacity?: number;
}
export class ShapeRenderingProfile extends Component<IShapeRenderingProfile> {}

export interface IImageRenderingProfile {
    src: string;
    opacity?: number;
}
export class ImageRenderingProfile extends Component<IImageRenderingProfile> {}
