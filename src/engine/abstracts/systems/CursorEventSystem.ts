import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../../concretes/components/CursorEventComponent';
import { OnlyIfEntityHas } from '../Entity';
import ISystem from '../../interfaces/ISystem';
import Invocable from '../../../framework/abstracts/Invocable';
import PoseComponent from '../../concretes/components/PoseComponent';
import ShapeComponent from '../../concretes/components/ShapeComponent';
import System from '../System';
import { isPointInsideShape } from '../../../geometry/methods/shapes';

export default abstract class CursorEventSystem extends System<CursorEventComponent> {

    constructor() {
        super(CursorEventComponent);
    }

}

export function OnCursorEvent<TSystem extends CursorEventSystem>(event: CURSOR_EVENT)
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
        descriptor.value = function(component: CursorEventComponent): void {
            return (component.data.eventName === event)
                ? method.call(this, ...arguments)
                : undefined;
        };
    };
}

export function OnCursorIntersection<TComponent>(
    target: ISystem<TComponent>,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: CursorEventComponent): any {
        return CursorIntersectsEntityValidator.invoke(component)
            ? method.call(this, ...arguments)
            : undefined;
    };
}

export class CursorIntersectsEntityValidator extends Invocable<CursorEventComponent, boolean> {

    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(ShapeComponent)
    public static invoke(component: CursorEventComponent): boolean {
        const pose = component.entity.get(PoseComponent).data;
        const shape = component.entity.get(ShapeComponent).data;
        return isPointInsideShape(component.data, shape, pose);
    }

}
