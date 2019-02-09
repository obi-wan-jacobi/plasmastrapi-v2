import { OnlyIfEntityHas } from '../Entity';
import Invocable from '../../../framework/abstracts/Invocable';
import { MOUSE_EVENT } from '../../enums/MOUSE_EVENT';
import MouseEventComponent from '../../components/MouseEventComponent';
import PoseComponent from '../../components/PoseComponent';
import ShapeComponent from '../../components/ShapeComponent';
import System from '../System';
import { isPointInsideShape } from '../../../geometry/methods/shapes';

export default abstract class MouseEventSystem extends System<MouseEventComponent> {

    constructor() {
        super(MouseEventComponent);
    }

    public once(component: MouseEventComponent): void { return; }

}

export function OnMouseEvent<TSystem extends MouseEventSystem>(event: MOUSE_EVENT)
: (
    target: TSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) => void {
    return function(
        target: TSystem,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ): void {
        const method = target.constructor.prototype.once;
        target.constructor.prototype.once = function(component: MouseEventComponent): void {
            method.call(this, component);
            if (component.data.eventName === event) {
                descriptor.value.call(this, component);
            }
        };
    };
}

export function OnCursorIntersection(
    target: MouseEventSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: MouseEventComponent): any {
        return MouseIntersectsEntityValidator.invoke(component)
            ? method.call(this, ...arguments)
            : undefined;
    };
}

export function WhenShiftKeyIsUp(
    target: MouseEventSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: MouseEventComponent): any {
        return (component.data.isShiftDown)
            ? undefined
            : method.call(this, ...arguments);
    };
}

export function WhenShiftKeyIsDown(
    target: MouseEventSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: MouseEventComponent): any {
        return (component.data.isShiftDown)
            ? method.call(this, ...arguments)
            : undefined;
    };
}

export class MouseIntersectsEntityValidator extends Invocable<MouseEventComponent, boolean> {

    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(ShapeComponent)
    public static invoke(component: MouseEventComponent): boolean {
        const pose = component.entity.get(PoseComponent).data;
        const shape = component.entity.get(ShapeComponent).data;
        return isPointInsideShape(component.data, shape, pose);
    }

}
