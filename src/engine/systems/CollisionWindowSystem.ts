import { System } from '../abstracts/System';
import { IPoint, PoseComponent, ShapeComponent, VelocityComponent } from '../components';
import { CollisionBody, CollisionWindow, entityContainsEntity } from '../entities';
import { getEuclideanDistanceBetweenPoints, transformShape } from '../geometry';

export default class CollisionWindowSystem extends System {

    private __last: IPoint = { x: 0, y: 0 };

    public once(): void {
        this.$engine.entities.forEvery(CollisionWindow)((cWindow) => {
            const wPose = cWindow.$copy(PoseComponent);
            const { width, height } = cWindow.$copy(ShapeComponent).points.map((p) => (
                { width: Math.abs(2 * p.x), height: Math.abs(2 * p.y) }
            ))[0];
            this.$engine.entities.forEvery(CollisionBody)((cBody) => {
                if (entityContainsEntity(cWindow, cBody)) {
                    return;
                }
                const bPose = cBody.$copy(PoseComponent);
                const pose = {
                    x: bPose.x - wPose.x, y: bPose.y - wPose.x, a: bPose.a,
                };
                const shape = cBody.$copy(ShapeComponent);
                const velocity = cBody.$copy(VelocityComponent);
                const dt = this.$engine.delta;
                // get deepest vertex
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
                const initialDeepestVertex = transformShape(shape, {
                    x: bPose.x - velocity.x * dt,
                    y: bPose.y - velocity.y * dt,
                    a: bPose.a - velocity.w * dt,
                }).points[deepestCursor];
                // x = 0 + t * 1
                // y = height
                const r = getEuclideanDistanceBetweenPoints(bPose, deepestVertex);
                const t = (height - initialDeepestVertex.y) / (velocity.y + r * Math.sin(velocity.w));
                const correction = {
                    x: initialDeepestVertex.x + velocity.x * t,
                    y: initialDeepestVertex.y + velocity.y * t,
                };
                this.__last = correction;
            });
        });
    }

    public draw(): void {
        this.$engine.viewport.drawCircle({ point: this.__last, radius: 3, rendering: { colour: 'WHITE' }});
    }
}
