import { HTML5_COLOUR } from './enums/HTML5_COLOUR';
import IComponent from '../engine/interfaces/IComponent';
import IRenderingProfile from '../engine/interfaces/IRenderingProfile';
import IShape2D from '../geometry/interfaces/IShape2D';
import IViewportAdapter from '../engine/interfaces/IViewportAdapter';

const TWO_PI_RADIANS = 2 * Math.PI;
const DEFAULT_RADIUS = 2;

export default class HTML5CanvasViewportAdapter implements
 IViewportAdapter<CanvasRenderingContext2D, IRenderingProfile<HTML5_COLOUR>> {

    private __canvas: HTMLCanvasElement;
    private __ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.__canvas = canvas;
        this.__ctx = this.__canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    public get ctx(): CanvasRenderingContext2D {
        return this.__ctx;
    }

    public sync(): void {
        const width = this.__canvas.clientWidth;
        const height = this.__canvas.clientHeight;
        this.ctx.clearRect(0, 0, width, height);
    }

    @Atomic
    public drawPoint(point: { x: number, y: number }): void {
        this.ctx.arc(point.x, point.y, DEFAULT_RADIUS, 0, TWO_PI_RADIANS);
    }

    @Atomic
    public drawShape(shape: IShape2D): void {
        shape.vertices.forEach((point) => {
            this.ctx.lineTo(point.x, point.y);
        });
    }

}

function Atomic(
    target: HTML5CanvasViewportAdapter,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function<TComponent extends IComponent<any>>(
        component: TComponent, renderProfile: IComponent<IRenderingProfile<HTML5_COLOUR>>,
    ): void {
        this.ctx.save();
        this.ctx.strokeStyle = renderProfile.data.colour;
        this.ctx.beginPath();
        method.call(this, component, renderProfile);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
    };
}
