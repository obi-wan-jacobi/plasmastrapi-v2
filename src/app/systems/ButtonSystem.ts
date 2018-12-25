import CursorComponent from '../../framework/concretes/components/CursorComponent';
import CursorSystem from '../../framework/abstracts/CursorSystem';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../framework/interfaces/IPosition2D';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import RenderingComponent from '../../framework/concretes/components/RenderingComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';

export default class ButtonSystem extends CursorSystem {

    protected _onCursorEnable(component: CursorComponent): void {
        return;
    }

    protected _onCursorTranslate(component: CursorComponent): void {
        const pose = component.entity.components.get(PoseComponent).data;
        const shape = component.entity.components.get(ShapeComponent).data;
        const vertices = shape.vertices.map((vertex) => {
            return { x: vertex.x + pose.x, y: vertex.y + pose.y };
        });
        if (__isPointContained(component.data.cursor, vertices)) {
            component.entity.components.get(RenderingComponent).data.colour = HTML5_COLOUR.BLUE;
        } else {
            component.entity.components.get(RenderingComponent).data.colour = HTML5_COLOUR.RED;
        }
    }

    protected _onCursorDisable(component: CursorComponent): void {
        return;
    }

    protected _onCursorBeginActuation(component: CursorComponent): void {
        const pose = component.entity.components.get(PoseComponent).data;
        const shape = component.entity.components.get(ShapeComponent).data;
        const vertices = shape.vertices.map((vertex) => {
            return { x: vertex.x + pose.x, y: vertex.y + pose.y };
        });
        if (__isPointContained(component.data.cursor, vertices)) {
            component.entity.components.get(RenderingComponent).data.colour = HTML5_COLOUR.GREEN;
        }
    }

    protected _onCursorEndActuation(component: CursorComponent): void {
        const pose = component.entity.components.get(PoseComponent).data;
        const shape = component.entity.components.get(ShapeComponent).data;
        const vertices = shape.vertices.map((vertex) => {
            return { x: vertex.x + pose.x, y: vertex.y + pose.y };
        });
        if (__isPointContained(component.data.cursor, vertices)) {
            component.entity.components.get(RenderingComponent).data.colour = HTML5_COLOUR.BLUE;
        }
    }

    protected _onCursorCompleteActuation(component: CursorComponent): void {
        const pose = component.entity.components.get(PoseComponent).data;
        const shape = component.entity.components.get(ShapeComponent).data;
        const vertices = shape.vertices.map((vertex) => {
            return { x: vertex.x + pose.x, y: vertex.y + pose.y };
        });
        if (__isPointContained(component.data.cursor, vertices)) {
            console.log('click!');
        }
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
