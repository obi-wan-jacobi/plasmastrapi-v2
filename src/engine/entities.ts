import booleanContains from '@turf/boolean-contains';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import Entity from './Entity';
import IEntity from './interfaces/IEntity';
import {
    AccelerationComponent, IPoint, IShape, PoseComponent,
    ShapeComponent, ShapeRenderingProfileComponent, VelocityComponent,
} from './components';
import { fromPointsToGeoJSON, fromShapeToGeoJSON, transformShape } from './geometry';
import turf from 'turf';
const booleanOverlaps = require('@turf/boolean-overlap').default;
const lineIntersect = require('@turf/line-intersect').default;

export class Interactive extends Entity {

    [key: string]: any;

    private __isDisabled: boolean = false;
    private __isHovered: boolean = false;

    public constructor({ x, y, a }: { x: number, y: number, a: number }) {
        super(arguments[0]);
        this.$add(PoseComponent)({ x, y, a });
    }

    public $enable(): void {
        this.__isDisabled = false;
    }

    public $disable(): void {
        this.__isDisabled = true;
    }

    public $once(): void {
        if (this.__isDisabled) {
            return;
        }
        if (this.$engine.mouse.name === 'none') {
            return;
        }
        if (!entityContainsPoint(this, this.$engine.mouse)) {
            if (this.$engine.mouse.name === 'mousemove') {
                this.$mousemove();
            }
            if (this.__isHovered) {
                this.__isHovered = false;
                this.$mouseleave();
            }
            return;
        }
        if (!this.__isHovered) {
            this.__isHovered = true;
            this.$mouseenter();
        }
        this[`$${this.$engine.mouse.name}`]();
    }

    public $mouseenter(): void { return; }
    public $mouseleave(): void { return; }
    public $mousemove(): void { return; }
    public $mousedown(): void { return; }
    public $mouseup(): void { return; }
    public $click(): void { return; }
}

export class InteractiveElement extends Interactive {

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(Object.assign({ a: 0 }, arguments[0]));
        this.$add(ShapeComponent)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
    }
}

export class CollisionWindow extends Entity {

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(Object.assign({ a: 0 }, arguments[0]));
        this.$add(PoseComponent)({ x, y, a: 0 });
        this.$add(ShapeComponent)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
        this.$add(ShapeRenderingProfileComponent)({ colour: 'WHITE' });
    }
}

export class CollisionBody extends Entity {

    public constructor({ x, y, a, shape }: { x: number, y: number, a: number, shape: IShape }) {
        super(arguments[0]);
        this.$add(PoseComponent)({ x, y, a: a || 0 });
        this.$add(ShapeComponent)(shape);
        this.$add(ShapeRenderingProfileComponent)({ colour: 'WHITE' });
        this.$add(VelocityComponent)({ x: 0, y: 0, w: 0 });
        this.$add(AccelerationComponent)({ x: 0, y: 0, w: 0 });
    }
}

export const entityContainsPoint = (entity: IEntity, point: IPoint): boolean => {
    const shape = transformShape(entity.$copy(ShapeComponent), entity.$copy(PoseComponent));
    return booleanPointInPolygon(turf.point([point.x, point.y]), fromShapeToGeoJSON(shape));
};

export const entitiesTouch = (entity1: IEntity, entity2: IEntity): boolean => {
    const shape1 = transformShape(entity1.$copy(ShapeComponent), entity1.$copy(PoseComponent));
    const shape2 = transformShape(entity2.$copy(ShapeComponent), entity2.$copy(PoseComponent));
    const geoJSON1 = fromShapeToGeoJSON(shape1);
    const geoJSON2 = fromShapeToGeoJSON(shape2);
    return booleanContains(geoJSON1, geoJSON2) ||
        booleanContains(geoJSON2, geoJSON1) ||
        booleanOverlaps(geoJSON1, geoJSON2) ||
        booleanOverlaps(geoJSON2, geoJSON1);
};

export const entityContainsEntity = (entity1: IEntity, entity2: IEntity): boolean => {
    const shape1 = transformShape(entity1.$copy(ShapeComponent), entity1.$copy(PoseComponent));
    const shape2 = transformShape(entity2.$copy(ShapeComponent), entity2.$copy(PoseComponent));
    const geoJSON1 = fromShapeToGeoJSON(shape1);
    const geoJSON2 = fromShapeToGeoJSON(shape2);
    return booleanContains(geoJSON1, geoJSON2) || booleanContains(geoJSON2, geoJSON1);
};

export const entityTouchesLine = (entity: IEntity, points: IPoint[]): boolean => {
    const shape = transformShape(entity.$copy(ShapeComponent), entity.$copy(PoseComponent));
    const polygon = fromShapeToGeoJSON(shape);
    const line = fromPointsToGeoJSON(points);
    return lineIntersect(polygon, line).features.length > 0;
};
