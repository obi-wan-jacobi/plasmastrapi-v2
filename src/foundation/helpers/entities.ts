import booleanContains from '@turf/boolean-contains';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import PoseComponent, { IPoint } from '../geometry/components/PoseComponent';
import ShapeComponent from '../geometry/components/ShapeComponent';
import IEntity from 'engine/interfaces/IEntity';
import { fromPointsToGeoJSON, fromShapeToGeoJSON, transformShape } from './geometry';
import turf from 'turf';
const booleanOverlaps = require('@turf/boolean-overlap').default;
const lineIntersect = require('@turf/line-intersect').default;

export const entityContainsPoint = (entity: IEntity, point: IPoint): boolean => {
    const shape = transformShape(entity.$copy(ShapeComponent)!, entity.$copy(PoseComponent)!);
    return booleanPointInPolygon(turf.point([point.x, point.y]), fromShapeToGeoJSON(shape));
};

export const entitiesTouch = (entity1: IEntity, entity2: IEntity): boolean => {
    const shape1 = transformShape(entity1.$copy(ShapeComponent)!, entity1.$copy(PoseComponent)!);
    const shape2 = transformShape(entity2.$copy(ShapeComponent)!, entity2.$copy(PoseComponent)!);
    const geoJSON1 = fromShapeToGeoJSON(shape1);
    const geoJSON2 = fromShapeToGeoJSON(shape2);
    return booleanContains(geoJSON1, geoJSON2) ||
        booleanContains(geoJSON2, geoJSON1) ||
        booleanOverlaps(geoJSON1, geoJSON2) ||
        booleanOverlaps(geoJSON2, geoJSON1);
};

export const entityContainsEntity = (entity1: IEntity, entity2: IEntity): boolean => {
    const shape1 = transformShape(entity1.$copy(ShapeComponent)!, entity1.$copy(PoseComponent)!);
    const shape2 = transformShape(entity2.$copy(ShapeComponent)!, entity2.$copy(PoseComponent)!);
    const geoJSON1 = fromShapeToGeoJSON(shape1);
    const geoJSON2 = fromShapeToGeoJSON(shape2);
    return booleanContains(geoJSON1, geoJSON2) || booleanContains(geoJSON2, geoJSON1);
};

export const entityTouchesLine = (entity: IEntity, points: IPoint[]): boolean => {
    const shape = transformShape(entity.$copy(ShapeComponent)!, entity.$copy(PoseComponent)!);
    const polygon = fromShapeToGeoJSON(shape);
    const line = fromPointsToGeoJSON(points);
    return lineIntersect(polygon, line).features.length > 0;
};

export const addWidthAndHeightAsShapeComponent = ({ entity, width, height }: { entity: IEntity; width: number; height: number }): void => {
    entity.$add(ShapeComponent, {
      vertices: [
        { x: -width/2, y: -height/2 },
        { x: -width/2, y: height/2 },
        { x: width/2, y: height/2 },
        { x: width/2, y: -height/2 },
      ],
    });
};
