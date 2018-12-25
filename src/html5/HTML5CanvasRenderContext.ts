import { Atomic } from './decorators/Atomic';
import { HTML5_COLOUR } from './enums/HTML5_COLOUR';
import IRenderingProfile from '../framework/interfaces/IRenderingProfile';
import IShape from '../framework/interfaces/IShape';
import RenderContext from '../framework/abstracts/rendering/RenderContext';

const TWO_PI_RADIANS = 2 * Math.PI;
const DEFAULT_RADIUS = 2;

export default class HTML5CanvasRenderContext
extends RenderContext<CanvasRenderingContext2D, IRenderingProfile<HTML5_COLOUR>> {

    private __canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas.getContext('2d') as CanvasRenderingContext2D);
        this.__canvas = canvas;
    }

    public get bounds(): ClientRect | DOMRect {
        return this.__canvas.getBoundingClientRect();
    }

    public refresh(): void {
        const width = this.__canvas.clientWidth;
        const height = this.__canvas.clientHeight;
        this.ctx.clearRect(0, 0, width, height);
    }

    @Atomic
    public drawPoint(point: { x: number, y: number }): void {
        this.ctx.arc(point.x, point.y, DEFAULT_RADIUS, 0, TWO_PI_RADIANS);
    }

    @Atomic
    public drawShape(shape: IShape): void {
        shape.vertices.forEach((point) => {
            this.ctx.lineTo(point.x, point.y);
        });
    }

}
