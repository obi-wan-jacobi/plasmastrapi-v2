import { Component } from './Component';

export interface IPoint { x: number; y: number; }

export interface IPose { x: number; y: number; a: number; }
export class PoseComponent extends Component<IPose> {}

export interface IShape { points: IPoint[]; }
export class ShapeComponent extends Component<IShape> {}

export interface ILabel {
    text: string;
    fontSize: number;
    offset: { x: number, y: number };
    colour?: string;
}
export class LabelComponent extends Component<ILabel> {}

export interface IShapeRenderingProfile {
    colour: string;
    opacity?: number;
    fillStyle?: string;
    zIndex?: number;
}
export class ShapeRenderingProfileComponent extends Component<IShapeRenderingProfile> {}

export interface IImageRenderingProfile {
    src: string;
    width?: number;
    height?: number;
    opacity?: number;
    zIndex?: number;
    rotate?: number;
}
export class ImageRenderingProfileComponent extends Component<IImageRenderingProfile> {}

export interface IAnimatedImageRenderingProfile {
    src: string[];
    frame: number;
    speed: number;
    cooldown: number;
    width?: number;
    height?: number;
    opacity?: number;
    isPaused?: boolean;
    isReversed?: boolean;
    zIndex?: number;
    rotate?: number;
}
export class AnimatedImageRenderingProfileComponent extends Component<IAnimatedImageRenderingProfile> {}

export interface IPoseStepper { x: number; y: number; a: number; }
export class PoseStepperComponent extends Component<IPoseStepper> {}

export interface IVelocity {
    x: number; y: number; w: number;
}
export class VelocityComponent extends Component<IVelocity> {}

export interface IAcceleration {
    x: number; y: number; w: number;
}
export class AccelerationComponent extends Component<IAcceleration> {}

export interface ICollisionProfile {
    mass: number;
    restitution: number;
}
