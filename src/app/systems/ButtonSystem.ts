import { CURSOR_EVENT } from '../../framework/enums/CURSOR_EVENT';
import CursorComponent from '../../framework/concretes/components/CursorComponent';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../framework/interfaces/IPosition2D';
import IShape from '../../framework/interfaces/IShape';
import InputSystem from '../../framework/abstracts/InputSystem';

export default class ButtonSystem extends InputSystem<CursorComponent> {

    constructor() {
        super(CursorComponent);
    }

    public once(component: CursorComponent): void {
        if (component.data.eventName === CURSOR_EVENT.CURSOR_COMPLETE_ACTUATION) {
            console.log('click!');
        }
    }

}

const __isPointContained = (point: IPosition2D, shape: IShape<HTML5_COLOUR>): boolean => {
    const bounds = __getMinMaxBounds(this);
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

const __getMinMaxBounds = (shape: IShape<any>): MinMaxBounds => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    shape.vertices.forEach((vertex) => {
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
