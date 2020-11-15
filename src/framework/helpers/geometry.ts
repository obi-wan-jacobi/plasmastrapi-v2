import { IPoint, IPose } from 'framework/geometry/components/PoseComponent';
import { IShape } from 'framework/geometry/components/ShapeComponent';
import { Feature, GeoJsonProperties, MultiPolygon, Polygon, LineString } from 'geojson';
import turf from 'turf';

export const rotatePointAboutOrigin = ({ point, orientation }: {
    point: IPoint; orientation: number;
}): IPoint => {
    const s = Math.sin(orientation);
    const c = Math.cos(orientation);
    return {
        x : point.x * c - point.y * s,
        y : point.x * s + point.y * c,
    };
};

export const transformShape = (shape: IShape, pose: IPose): IShape => {
    return {
        points: shape.points.map((p) => {
            const point = rotatePointAboutOrigin({ point: p, orientation: pose.a });
            return {
                x : point.x + pose.x,
                y : point.y + pose.y,
            };
        }),
    };
};

export const fromPointsToGeoJSON = (points: IPoint[]): Feature<LineString, GeoJsonProperties> => {
    return turf.lineString(points.map((point) => [point.x, point.y]));
};

export const fromShapeToGeoJSON = (shape: IShape): Feature<Polygon, GeoJsonProperties> => {
    return turf.polygon([
        shape.points.map((vertex) => [vertex.x, vertex.y ]).concat([[shape.points[0].x, shape.points[0].y]]),
    ]);
};

export const fromGeoJSONCoordinatesToShapes = (geoJSON: Feature<Polygon|MultiPolygon, GeoJsonProperties>): IShape[] => {
    if (!geoJSON) {
        return [];
    }
    if (geoJSON.geometry.type === 'Polygon') {
        return geoJSON.geometry.coordinates.map((points: number[][]) => {
            return { points: points.map((vertex: number[]) => ({ x: vertex[0], y: vertex[1] })) };
        });
    }
    if (geoJSON.geometry.type === 'MultiPolygon') {
        const shapes: IShape[] = [];
        geoJSON.geometry.coordinates.forEach((polygon) => {
            shapes.push(polygon.map((points: number[][]) => {
                return { points: points.map((vertex: number[]) => ({ x: vertex[0], y: vertex[1] })) };
            })[0]);
        });
        return shapes;
    }
    return [];
};

export interface IBoundary { minX: number; maxX: number; minY: number; maxY: number }
export const fromShapeToBoundary = (shape: IShape): IBoundary => {
    const geojson = fromShapeToGeoJSON(shape);
    const bbox = turf.bbox(geojson);
    return {
        minX : bbox[0],
        minY : bbox[1],
        maxX : bbox[2],
        maxY : bbox[3],
    };
};

export const getEuclideanDistanceBetweenPoints = (p1: IPoint, p2: IPoint): number => {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow(p2.y - p1.y, 2));
};

export const getAngleBetweenPoints = (p1: IPoint, p2: IPoint): number => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

export const pow2 = (target: number): number => {
    return Math.pow(target, 2);
};
