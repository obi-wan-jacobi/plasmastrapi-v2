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

export const getMinMaxShapeBounds = (shape: IShape2D): MinMaxBoundary2D => {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    shape.vertices.forEach((vertex) => {
        if (vertex.x < minX) { minX = __settleFloatingPoint(vertex.x); }
        if (vertex.x > maxX) { maxX = __settleFloatingPoint(vertex.x); }
        if (vertex.y < minY) { minY = __settleFloatingPoint(vertex.y); }
        if (vertex.y > maxY) { maxY = __settleFloatingPoint(vertex.y); }
    });
    return { minX, maxX, minY, maxY };
};

export const isPointInsideMinMaxBounds = (point: IPosition2D, bounds: MinMaxBoundary2D): boolean => {
    const { minX, maxX, minY, maxY } = bounds;
    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
};

export const isPointInsideShape = (
    point: IPosition2D, shape: IShape2D, pose: IPose2D,
): boolean => {
    shape = transformShape(shape, pose);
    const bounds = getMinMaxShapeBounds(shape);
    if (!isPointInsideMinMaxBounds(point, bounds)) {
        return false;
    }
    const { minX, minY } = {
        minX: (bounds.minX * 1000) / 1000,
        minY: (bounds.minY * 1000) / 1000,
    };
    const vertices = shape.vertices;
    let numberOfIntersections = 0;
    vertices.push(vertices[0]);
    const ray = fromPointsToStandardForm({ x: minX, y: minY }, point);
    for (let i = 0, L = vertices.length - 1; i < L; i++) {
        const { m, b } = fromPointsToStandardForm(vertices[i], vertices[i + 1]);
        const intersection = getIntersectionBetweenStandardForms(ray, { m, b });
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

export const fromPointsToStandardForm = (p1: IPosition2D, p2: IPosition2D): { m: number, b: number } => {
    let m = (p2.y - p1.y) / (p2.x - p1.x);
    m = isFinite(m) ? m : Number.MAX_SAFE_INTEGER;
    const b = p1.y - m * p1.x;
    return { m, b };
};

export const getIntersectionBetweenStandardForms = (
    eq1: { m: number, b: number },
    eq2: { m: number, b: number },
): IPosition2D => {
    let intersectX = (eq2.b - eq1.b) / (eq1.m - eq2.m);
    intersectX = isNaN(intersectX) ? Number.MAX_SAFE_INTEGER : intersectX;
    const intersectY = eq1.m * intersectX + eq1.b;
    return {
        x: __settleFloatingPoint(intersectX),
        y: __settleFloatingPoint(intersectY),
    };
};

export const fromShapeToLineSegments = (
    shape: IShape2D, pose: IPose2D,
): Array<{ head: IPosition2D, tail: IPosition2D }> => {
    shape = transformShape(shape, pose);
    const vertices = shape.vertices;
    vertices.push(vertices[0]);
    const segments = [];
    for (let i = 0, L = vertices.length; i < L - 1; i++) {
        segments.push({ head: vertices[i + 1], tail: vertices[i] });
    }
    return segments;
};

export const fromLineToLineSegments = ({ points }: { points: IPosition2D[] })
: Array<{ head: IPosition2D, tail: IPosition2D }> => {
    const segments = [];
    for (let i = 0, L = points.length; i < L - 1; i++) {
        segments.push({ head: points[i + 1], tail: points[i] });
    }
    return segments;
};

export const fromLineSegmentToStandardForm = (segment: { head: IPosition2D, tail: IPosition2D })
: { m: number, b: number } => {
    return fromPointsToStandardForm(segment.head, segment.tail);
};

export const isShapeIntersectedByLine = (
    shape: IShape2D,
    pose: IPose2D,
    line: { points: IPosition2D[] },
): boolean => {
    const segments = fromLineToLineSegments(line);
    for (const segment of segments) {
        if (isShapeIntersectedByLineSegment(shape, pose, segment)) {
            return true;
        }
    }
    return false;
};

export const isShapeIntersectedByLineSegment = (
    shape: IShape2D,
    pose: IPose2D,
    segment: { head: IPosition2D, tail: IPosition2D },
): boolean => {
    const shapeSegments = fromShapeToLineSegments(shape, pose);
    for (const shapeSegment of shapeSegments) {
        if (isLineSegmentIntersectedByLineSegment(shapeSegment, segment)) {
            return true;
        }
    }
    return false;
};

export const isLineSegmentIntersectedByLineSegment = (
    segment1: { head: IPosition2D, tail: IPosition2D },
    segment2: { head: IPosition2D, tail: IPosition2D },
): boolean => {
    const ray = fromPointsToStandardForm(segment1.tail, segment1.head);
    const { m, b } = fromPointsToStandardForm(segment2.tail, segment2.head);
    const intersection = getIntersectionBetweenStandardForms(ray, { m, b });
    return isPointInsideMinMaxBounds(intersection, getMinMaxLineSegmentBounds(segment1))
        && isPointInsideMinMaxBounds(intersection, getMinMaxLineSegmentBounds(segment2)) ;
};

export const getMinMaxLineSegmentBounds = (segment: { head: IPosition2D, tail: IPosition2D }): MinMaxBoundary2D => {
    return getMinMaxShapeBounds({ vertices: [segment.tail, segment.head] });
};

const __settleFloatingPoint = (value: number): number => {
    return (value * 1000) / 1000;
};
