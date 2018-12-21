import HTML5CanvasRenderContext from '../HTML5CanvasRenderContext';
import IRenderable from '../../framework/interfaces/IRenderable';

export function Atomic(
    target: HTML5CanvasRenderContext,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(renderable: IRenderable<any>): void {
        this.ctx.save();
        this.ctx.strokeStyle = renderable.colour;
        this.ctx.beginPath();
        method.call(this, renderable);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
    };
}
