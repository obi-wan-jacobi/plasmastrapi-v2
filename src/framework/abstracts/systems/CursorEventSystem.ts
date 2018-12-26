import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import CursorEventComponent from '../../concretes/components/CursorEventComponent';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../interfaces/IPosition2D';
import PoseComponent from '../../concretes/components/PoseComponent';
import RenderingComponent from '../../concretes/components/RenderingComponent';
import ShapeComponent from '../../concretes/components/ShapeComponent';
import System from './System';
import TranslatableComponent from '../../../app/components/TranslatableComponent';

export default abstract class CursorEventSystem extends System<CursorEventComponent> {

    private __responseMap: { [key: string]: (component: CursorEventComponent) => void} = {
        [CURSOR_EVENT.UNDEFINED]: () => undefined,
        [CURSOR_EVENT.CURSOR_ENABLE]: (component: CursorEventComponent): void => {
            this.__onCursorEnable(component);
        },
        [CURSOR_EVENT.CURSOR_TRANSLATE]: (component: CursorEventComponent): void => {
            this.__onCursorTranslate(component);
        },
        [CURSOR_EVENT.CURSOR_DISABLE]: (component: CursorEventComponent): void => {
            this.__onCursorDisable(component);
        },
        [CURSOR_EVENT.CURSOR_BEGIN_ACTUATION]: (component: CursorEventComponent): void => {
            this.__onCursorBeginActuation(component);
        },
        [CURSOR_EVENT.CURSOR_END_ACTUATION]: (component: CursorEventComponent): void => {
            this.__onCursorEndActuation(component);
        },
        [CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION]: (component: CursorEventComponent): void => {
            this.__onCursorCompleteActuation(component);
        },
    };

    constructor() {
        super(CursorEventComponent);
    }

    public once(component: CursorEventComponent): void {
        this.__responseMap[component.data.eventName](component);
    }

    private __onCursorEnable(component: CursorEventComponent): void {
        return;
    }

    private __onCursorTranslate(component: CursorEventComponent): void {
        const translatable = component.entity.components.get(TranslatableComponent);
        if (!translatable) {
            return;
        }
        if (translatable.data.previous.cursor.x && translatable.data.previous.cursor.y) {
            const pose = component.entity.components.get(PoseComponent);
            pose.data.x = pose.data.x + (component.data.x - translatable.data.previous.cursor.x);
            pose.data.y = pose.data.y + (component.data.y - translatable.data.previous.cursor.y);
        }
        translatable.data.previous.cursor.x = component.data.x;
        translatable.data.previous.cursor.y = component.data.y;
    }

    private __onCursorDisable(component: CursorEventComponent): void {
        return;
    }

    private __onCursorBeginActuation(component: CursorEventComponent): void {
        const pose = component.entity.components.get(PoseComponent).data;
        const shape = component.entity.components.get(ShapeComponent).data;
        const vertices = shape.vertices.map((vertex) => {
            return { x: vertex.x + pose.x, y: vertex.y + pose.y };
        });
        if (__isPointContained(component.data, vertices)) {
            component.entity.components.get(RenderingComponent).data.colour = HTML5_COLOUR.GREEN;
            if (!component.entity.components.get(TranslatableComponent)) {
                component.entity.components.add(new TranslatableComponent({}));
                return;
            }
        }
        component.entity.components.remove(TranslatableComponent);
    }

    private __onCursorEndActuation(component: CursorEventComponent): void {
        const pose = component.entity.components.get(PoseComponent).data;
        const shape = component.entity.components.get(ShapeComponent).data;
        const vertices = shape.vertices.map((vertex) => {
            return { x: vertex.x + pose.x, y: vertex.y + pose.y };
        });
        if (__isPointContained(component.data, vertices)) {
            component.entity.components.get(RenderingComponent).data.colour = HTML5_COLOUR.BLUE;
        }
    }

    private __onCursorCompleteActuation(component: CursorEventComponent): void {
        return;
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
    return true;
};

class MinMaxBounds {

    public minX: number;
    public maxX: number;
    public minY: number;
    public maxY: number;

    constructor({ minX, maxX, minY, maxY }: { minX: number, maxX: number, minY: number, maxY: number}) {
        Object.assign(this, arguments);
    }

}

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

const __isRayTraceIntersectionDetected = (): boolean => {

    return true;
};
