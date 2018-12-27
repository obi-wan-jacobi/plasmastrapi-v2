import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../../concretes/components/CursorEventComponent';
import { EntityMustPossess } from '../../concretes/Entity';
import IPosition2D from '../../interfaces/IPosition2D';
import Invocable from '../Invocable';
import PoseComponent from '../../concretes/components/PoseComponent';
import { MinMaxBounds } from '../Shape2D';
import ShapeComponent from '../../concretes/components/ShapeComponent';
import System from '../System';

export default abstract class CursorEventSystem extends System<CursorEventComponent> {

    private __responseMap: { [key: string]: (component: CursorEventComponent) => void} = {
        [CURSOR_EVENT.UNDEFINED]: () => undefined,
        [CURSOR_EVENT.CURSOR_ENABLE]: (component: CursorEventComponent): void => {
            this._onCursorEnable(component);
        },
        [CURSOR_EVENT.CURSOR_TRANSLATE]: (component: CursorEventComponent): void => {
            this._onCursorTranslate(component);
        },
        [CURSOR_EVENT.CURSOR_DISABLE]: (component: CursorEventComponent): void => {
            this._onCursorDisable(component);
        },
        [CURSOR_EVENT.CURSOR_BEGIN_ACTUATION]: (component: CursorEventComponent): void => {
            this._onCursorBeginActuation(component);
        },
        [CURSOR_EVENT.CURSOR_END_ACTUATION]: (component: CursorEventComponent): void => {
            this._onCursorEndActuation(component);
        },
        [CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION]: (component: CursorEventComponent): void => {
            this._onCursorCompleteActuation(component);
        },
    };

    constructor() {
        super(CursorEventComponent);
    }

    public once(component: CursorEventComponent): void {
        this.__responseMap[component.data.eventName](component);
    }

    protected _onCursorEnable(component: CursorEventComponent): void {
        return;
    }

    protected _onCursorTranslate(component: CursorEventComponent): void {
        return;
    }

    protected _onCursorDisable(component: CursorEventComponent): void {
        return;
    }

    protected _onCursorBeginActuation(component: CursorEventComponent): void {
        return;
    }

    protected _onCursorEndActuation(component: CursorEventComponent): void {
        return;
    }

    protected _onCursorCompleteActuation(component: CursorEventComponent): void {
        return;
    }

}

export function CursorMustIntersectEntity<TComponent>(
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

    @EntityMustPossess(PoseComponent)
    @EntityMustPossess(ShapeComponent)
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
