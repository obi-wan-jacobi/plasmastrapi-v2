import RenderContext from 'src/framework/abstracts/RenderContext';
/* tslint:disable:no-magic-numbers */

const TWO_PI_RADIANS = (2) * Math.PI;
const DEFAULT_RADIUS = 5;

export default class HTML5CanvasRenderContext extends RenderContext<CanvasRenderingContext2D> {

    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
        super({ target: canvas.getContext('2d') as CanvasRenderingContext2D });
    }

    @atomic
    public drawPoint({ x, y}: { x: number, y: number }): void {
        this.ctx.arc(x, y, DEFAULT_RADIUS, 0, TWO_PI_RADIANS);
    }

}

const atomic = (
    target: HTML5CanvasRenderContext,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) => {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]): void {
        this.ctx.save();
        method.call(this, ...args);
        this.ctx.restore();
    };
};
