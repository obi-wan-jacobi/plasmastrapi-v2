import { Atomic } from './decorators/Atomic';
import IPosition2D from '../framework/interfaces/IPosition2D';
import RenderContext from '../framework/abstracts/RenderContext';

const TWO = 2;
const TWO_PI_RADIANS = TWO * Math.PI;
const DEFAULT_RADIUS = 50;

export default class HTML5CanvasRenderContext extends RenderContext<CanvasRenderingContext2D> {

    private __canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas.getContext('2d') as CanvasRenderingContext2D);
        this.__canvas = canvas;
    }

    public refresh(): void {
        const width = this.__canvas.clientWidth;
        const height = this.__canvas.clientHeight;
        this.ctx.clearRect(0, 0, width, height);
    }

    @Atomic
    public drawPoint({ x, y}: IPosition2D): void {
        this.ctx.arc(x, y, DEFAULT_RADIUS, 0, TWO_PI_RADIANS);
    }

}
