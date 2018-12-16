import HTML5CanvasRenderContext from '../HTML5CanvasRenderContext';

export function Atomic(
    target: HTML5CanvasRenderContext,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]): void {
        this.ctx.save();
        console.log('oh');
        method.call(this, ...args);
        console.log('baby');
        this.ctx.restore();
    };
}
