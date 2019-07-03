import booleanContains from '@turf/boolean-contains';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import Entity from './Entity';
import IEntity from './interfaces/IEntity';
import { IPoint, Pose, RenderingProfile, Shape } from './components';
import { fromPointsToGeoJSON, fromShapeToGeoJSON, transformShape } from './geometry';
import turf from 'turf';
const booleanOverlaps = require('@turf/boolean-overlap').default;
const lineIntersect = require('@turf/line-intersect').default;

export class Interactive extends Entity {

    [key: string]: any;

    private __isDisabled: boolean = false;
    private __isHovered: boolean = false;

    constructor({ x, y, a }: { x: number, y: number, a: number }) {
        super(arguments[0]);
        this.add(Pose)({ x, y, a });
    }

    public enable(): void {
        this.__isDisabled = false;
    }

    public disable(): void {
        this.__isDisabled = true;
    }

    public once(): void {
        if (this.__isDisabled) {
            return;
        }
        if (this.$engine.mouse.name === 'mousemove') {
            this['mousemove']();
            return;
        }
        if (!entityContainsPoint(this, this.$engine.mouse)) {
            if (this.__isHovered) {
                this.__isHovered = false;
                this.mouseleave();
            }
            return;
        }
        if (!this.__isHovered) {
            this.__isHovered = true;
            this.mouseenter();
        }
        this[this.$engine.mouse.name]();
    }

    public mouseenter(): void { return; }
    public mouseleave(): void { return; }
    public mousemove(): void { return; }
    public mousedown(): void { return; }
    public mouseup(): void { return; }
    public click(): void { return; }
}

export class Button extends Interactive {

    constructor({ x, y }: { x: number, y: number }) {
        super(Object.assign({ a: 0 }, arguments[0]));
        this.add(Shape)({ points: [
            { x: 20, y: 20 },
            { x: -20, y: 20 },
            { x: -20, y: -20 },
            { x: 20, y: -20 },
        ]});
        this.add(RenderingProfile)({ colour: 'WHITE' });
    }
}

export const entityContainsPoint = (entity: IEntity, point: IPoint): boolean => {
    const shape = transformShape(entity.copy(Shape), entity.copy(Pose));
    return booleanPointInPolygon(turf.point([point.x, point.y]), fromShapeToGeoJSON(shape));
};

export const entitiesTouch = (entity1: IEntity, entity2: IEntity): boolean => {
    const shape1 = transformShape(entity1.copy(Shape), entity1.copy(Pose));
    const shape2 = transformShape(entity2.copy(Shape), entity2.copy(Pose));
    return booleanContains(fromShapeToGeoJSON(shape1), fromShapeToGeoJSON(shape2)) ||
        booleanContains(fromShapeToGeoJSON(shape2), fromShapeToGeoJSON(shape1)) ||
        booleanOverlaps(fromShapeToGeoJSON(shape1), fromShapeToGeoJSON(shape2)) ||
        booleanOverlaps(fromShapeToGeoJSON(shape2), fromShapeToGeoJSON(shape1));
};

export const entityTouchesLine = (entity: IEntity, points: IPoint[]): boolean => {
    const shape = transformShape(entity.copy(Shape), entity.copy(Pose));
    const polygon = fromShapeToGeoJSON(shape);
    const line = fromPointsToGeoJSON(points);
    return lineIntersect(polygon, line).features.length > 0;
};
