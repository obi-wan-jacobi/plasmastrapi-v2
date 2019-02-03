import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import { OnlyIfEntityHas } from '../Entity';
import InputComponent from '../../components/InputComponent';
import Invocable from '../../../framework/abstracts/Invocable';
import PoseComponent from '../../components/PoseComponent';
import ShapeComponent from '../../components/ShapeComponent';
import System from '../System';
import { isPointInsideShape } from '../../../geometry/methods/shapes';

export default abstract class InputSystem extends System<InputComponent> {

    constructor() {
        super(InputComponent);
    }

}

export function OnInputEvent<TSystem extends InputSystem>(event: CURSOR_EVENT)
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
        const method = descriptor.value;
        descriptor.value = function(component: InputComponent): void {
            return (component.data.eventName === event)
                ? method.call(this, ...arguments)
                : undefined;
        };
    };
}

export function OnCursorIntersection(
    target: InputSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: InputComponent): any {
        return CursorIntersectsEntityValidator.invoke(component)
            ? method.call(this, ...arguments)
            : undefined;
    };
}

export function WhenShiftKeyIsUp(
    target: InputSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: InputComponent): any {
        return (component.data.isShiftDown)
            ? undefined
            : method.call(this, ...arguments);
    };
}

export function WhenShiftKeyIsDown(
    target: InputSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: InputComponent): any {
        return (component.data.isShiftDown)
            ? method.call(this, ...arguments)
            : undefined;
    };
}

export class CursorIntersectsEntityValidator extends Invocable<InputComponent, boolean> {

    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(ShapeComponent)
    public static invoke(component: InputComponent): boolean {
        const pose = component.entity.get(PoseComponent).data;
        const shape = component.entity.get(ShapeComponent).data;
        return isPointInsideShape(component.data, shape, pose);
    }

}
