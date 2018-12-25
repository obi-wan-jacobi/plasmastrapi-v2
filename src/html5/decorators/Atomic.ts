import HTML5CanvasViewportAdapter from '../HTML5CanvasViewportAdapter';
import { HTML5_COLOUR } from '../enums/HTML5_COLOUR';
import IComponent from '../../framework/interfaces/IComponent';
import RenderingComponent from '../../framework/concretes/components/RenderingComponent';

export function Atomic(
    target: HTML5CanvasViewportAdapter,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function<TComponent extends IComponent<any>>(
        component: TComponent, renderProfile: RenderingComponent<{ colour: HTML5_COLOUR }>
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
