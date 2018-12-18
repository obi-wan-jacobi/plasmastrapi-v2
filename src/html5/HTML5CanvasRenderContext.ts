import IPosition2D from '../framework/interfaces/IPosition2D';
import RenderContext from '../framework/abstracts/RenderContext';
import { Atomic } from './decorators/Atomic';

const TWO = 2;
const TWO_PI_RADIANS = TWO * Math.PI;
const DEFAULT_RADIUS = 5;

export default class HTML5CanvasRenderContext extends RenderContext<CanvasRenderingContext2D> {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas.getContext('2d') as CanvasRenderingContext2D);
    }

    @Atomic
    public drawPoint({ x, y}: IPosition2D): void {
        this.ctx.strokeStyle = 'white';
        this.ctx.arc(x, y, DEFAULT_RADIUS, 0, TWO_PI_RADIANS);
        this.ctx.stroke();
    }

}
