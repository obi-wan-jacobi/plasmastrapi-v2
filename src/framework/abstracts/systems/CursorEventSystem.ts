import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../../concretes/components/CursorEventComponent';
import { OnlyIfEntityHas } from '../../concretes/Entity';
import IPosition2D from '../../interfaces/IPosition2D';
import Invocable from '../Invocable';
import PoseComponent from '../../concretes/components/PoseComponent';
import { MinMaxBounds } from '../Shape2D';
import ShapeComponent from '../../concretes/components/ShapeComponent';
import System from '../System';

export default abstract class CursorEventSystem extends System<CursorEventComponent> {

    constructor() {
        super(CursorEventComponent);
    }

}

export function OnCursorEvent<TSystem extends CursorEventSystem>(event: CURSOR_EVENT)
: (
    target: TSystem,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
) => void {
    return function(
        target: TSystem,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ): void {
        const method = descriptor.value;
        descriptor.value = function(component: CursorEventComponent): void {
            if (component.data.eventName !== event) {
                return;
            }
            method.call(this, ...arguments);
        };
    };
}

export function OnCursorIntersection<TComponent>(
    target: System<TComponent>,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
): any {
    const method = descriptor.value;
    descriptor.value = function(component: CursorEventComponent): any {
        if (!CursorIntersectsEntityValidator.invoke(component)) {
            return;
        }
        return method.call(this, ...arguments);
    };
}

class CursorIntersectsEntityValidator extends Invocable<CursorEventComponent, boolean> {

    @OnlyIfEntityHas(PoseComponent)
    @OnlyIfEntityHas(ShapeComponent)
    public static invoke(component: CursorEventComponent): boolean {
        const pose = component.entity.components.get(PoseComponent).data;
        const shape = component.entity.components.get(ShapeComponent).data;
        const vertices = shape.vertices.map((vertex) => {
            return { x: vertex.x + pose.x, y: vertex.y + pose.y };
        });
        if (!__isPointContained(component.data, vertices)) {
            return false;
        }
        return true;
    }

}

const __isPointContained = (point: IPosition2D, vertices: IPosition2D[]): boolean => {
    const bounds = __getMinMaxBounds(vertices);
    if (!__isPointWithinMinMaxBounds(point, bounds)) {
        return false;
    }
    const outerBounds = {
        minX: bounds.minX - 1,
        maxX: bounds.maxX + 1,
        minY: bounds.minY - 1,
        maxY: bounds.maxY + 1,
    };
    return __isRayTraceIntersectionDetected(outerBounds);
};

const __getMinMaxBounds = (vertices: IPosition2D[]): MinMaxBounds => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    vertices.forEach((vertex) => {
        if (vertex.x < minX) {
            minX = vertex.x;
        }
        if (vertex.x > maxX) {
            maxX = vertex.x;
        }
        if (vertex.y < minY) {
            minY = vertex.y;
        }
        if (vertex.y > maxY) {
            maxY = vertex.y;
        }
    });
    return { minX, maxX, minY, maxY };
};

const __isPointWithinMinMaxBounds = (point: IPosition2D, bounds: MinMaxBounds): boolean => {
    const { minX, maxX, minY, maxY } = bounds;
    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
};

const __isRayTraceIntersectionDetected = (bounds: MinMaxBounds): boolean => {
    return true;
};
