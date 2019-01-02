import IPose2D from '../interfaces/IPose2D';
import IPosition2D from '../interfaces/IPosition2D';
import IShape2D from '../interfaces/IShape2D';
import { MinMaxBoundary2D } from '../concretes/MinMaxBoundary2D';

export const transformShape = (shape: IShape2D, pose: IPose2D): IShape2D => {
    const vertices = shape.vertices.map((vertex) => {
        return rotatePointAboutOrigin(vertex, pose.a);
    });
    return translateShape({ vertices }, pose);
};

export const translateShape = (shape: IShape2D, position: IPosition2D): IShape2D => {
    const vertices = shape.vertices.map((vertex) => {
        return {
            x: vertex.x + position.x,
            y: vertex.y + position.y,
        };
    });
    return { vertices };
};

export const rotatePointAboutOrigin = (point: IPosition2D, angleInRadians: number): IPosition2D => {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    const x = point.x * c - point.y * s;
    const y = point.x * s + point.y * c;
    return { x, y };
};

export const getMinMaxBounds = (shape: IShape2D): MinMaxBoundary2D => {
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

export const isPointWithinMinMaxBounds = (point: IPosition2D, bounds: MinMaxBoundary2D): boolean => {
    const { minX, maxX, minY, maxY } = bounds;
    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
};

export const isPointInsideShape = (
    point: IPosition2D, shape: IShape2D, pose: IPose2D,
): boolean => {
    shape = transformShape(shape, pose);
    const bounds = getMinMaxBounds(shape);
    if (!isPointWithinMinMaxBounds(point, bounds)) {
        return false;
    }
    const { minX, minY } = {
        minX: (bounds.minX * 1000) / 1000,
        minY: (bounds.minY * 1000) / 1000,
    };
    const vertices = shape.vertices;
    let numberOfIntersections = 0;
    vertices.push(vertices[0]);
    const ray = fromPointsToStandardFormLinearEquation({ x: minX, y: minY }, point);
    for (let i = 0, L = vertices.length - 1; i < L; i++) {
        const { m, b } = fromPointsToStandardFormLinearEquation(vertices[i], vertices[i + 1]);
        const intersection = fromStarndardLinearFormLinearEquationsToPointOfIntersection(ray, { m, b });
        const { intersectX, intersectY } = {
            intersectX: (intersection.x * 1000) / 1000,
            intersectY: (intersection.y * 1000) / 1000,
        };
        const px = (point.x * 1000) / 1000;
        const py = (point.y * 1000) / 1000;
        if (intersectX <= px && intersectX >= minX && intersectY <= py && intersectY >= minY) {
            if (Math.round(intersectX) === Math.round(minX) && Math.round(intersectY) === Math.round(minY)) {
                return true;
            } else {
                numberOfIntersections++;
            }
        }
    }
    return ((numberOfIntersections % 2) === 1)
        ? true
        : false;
};

export const fromPointsToStandardFormLinearEquation = (p1: IPosition2D, p2: IPosition2D): { m: number, b: number } => {
    let m = (p2.y - p1.y) / (p2.x - p1.x);
    m = isFinite(m) ? m : Number.MAX_SAFE_INTEGER;
    const b = p1.y - m * p1.x;
    return { m, b };
};

export const fromStarndardLinearFormLinearEquationsToPointOfIntersection = (
    eq1: { m: number, b: number },
    eq2: { m: number, b: number },
): IPosition2D => {
    let intersectX = (eq2.b - eq1.b) / (eq1.m - eq2.m);
    intersectX = isNaN(intersectX) ? Number.MAX_SAFE_INTEGER : intersectX;
    const intersectY = eq1.m * intersectX + eq1.b;
    return {
        x: intersectX,
        y: intersectY,
    };
};
