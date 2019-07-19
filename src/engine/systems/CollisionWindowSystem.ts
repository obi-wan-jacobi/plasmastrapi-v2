import { System } from '../abstracts/System';
import { IPoint, PoseComponent, ShapeComponent, VelocityComponent } from '../components';
import { CollisionBody, CollisionWindow, entityContainsEntity } from '../entities';
import { getAngleBetweenPoints, getEuclideanDistanceBetweenPoints, pow2, transformShape } from '../geometry';

export default class CollisionWindowSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(CollisionWindow)((cWindow) => {
            const wPose = cWindow.$copy(PoseComponent);
            const { width, height } = cWindow.$copy(ShapeComponent).points.map((p) => ({
                width: Math.abs(2 * p.x),
                height: Math.abs(2 * p.y),
            }))[0];
            const dt = this.$engine.delta;
            this.$engine.entities.forEvery(CollisionBody)((cBody) => {
                if (entityContainsEntity(cWindow, cBody)) {
                    return;
                }
                const bPose = cBody.$copy(PoseComponent);
                const shape = cBody.$copy(ShapeComponent);
                const velocity = cBody.$copy(VelocityComponent);
                const initialPose = {
                    x: bPose.x - velocity.x * dt,
                    y: bPose.y - velocity.y * dt,
                    a: bPose.a - velocity.w * dt,
                };
                let deepestVertex: IPoint = { x: 0, y: 0 };
                const vertices = transformShape(shape, bPose).points;
                let cursor = 0;
                let deepestCursor = 0;
                for (const vertex of vertices) {
                    if (vertex.y >= deepestVertex.y) {
                        deepestVertex = vertex;
                        deepestCursor = cursor;
                    }
                    cursor++;
                }
                const initialDeepestVertex = transformShape(shape, initialPose).points[deepestCursor];
                const dtMiddle = dt / 2;
                const middlePose = {
                    x: bPose.x - velocity.x * dtMiddle,
                    y: bPose.y - velocity.y * dtMiddle,
                    a: bPose.a - velocity.w * dtMiddle,
                };
                const middleDeepestVertex = transformShape(shape, middlePose).points[deepestCursor];
                const { a, b, c } = fromPointsToParabola(initialDeepestVertex, middleDeepestVertex, deepestVertex);
                const x1 = (-b + Math.sqrt(pow2(b) - 4 * a * (c - (height / 2 + wPose.y)))) / ( 2 * a );
                const x2 = (-b - Math.sqrt(pow2(b) - 4 * a * (c - (height / 2 + wPose.y)))) / ( 2 * a );
            });
        });
    }
}

const fromPointsToParabola = (p1: IPoint, p2: IPoint, p3: IPoint): { a: number, b: number, c: number } => {
    const y1 = p1.y;
    const a1 = pow2(p1.x);
    const b1 = p1.x;
    // -------------------
    const y2 = p2.y;
    const a2 = pow2(p2.x);
    const b2 = p2.x;
    // -------------------
    const y3 = p3.y;
    const a3 = pow2(p3.x);
    const b3 = p3.x;
    // -------------------
    const y4 = y1 - y2;
    const a4 = a1 - a2;
    const b4 = b1 - b2;
    // -------------------
    const y5 = y3 - y2;
    const a5 = a3 - a2;
    const b5 = b3 - b2;
    // -------------------
    const a = (y5 - (b5 / b4) * y4) / (a5 - (b5 / b4) * a4);
    const b = (y5 - a5 * a) / b5;
    const c = y1 - a1 * a - b1 * b;
    return { a, b, c };
};
