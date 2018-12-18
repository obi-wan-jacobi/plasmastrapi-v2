import HTML5CanvasRenderContext from '../HTML5CanvasRenderContext';

export function Atomic(
    target: HTML5CanvasRenderContext,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]): void {
        this.ctx.save();
        this.ctx.strokeStyle = 'white';
        this.ctx.beginPath();
        method.call(this, ...args);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
    };
}
