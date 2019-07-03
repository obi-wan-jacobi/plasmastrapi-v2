import IEntity from '../engine/interfaces/IEntity';
import { System } from '../engine/abstracts/System';
import { Pose } from '../engine/components';
import { entityContainsPoint } from '../engine/entities';
import { getEuclideanDistanceBetweenPoints, transformShape } from '../engine/geometry';
import {
    BuildArea, GateCreatorHandle, GateMask, InputTerminalHandle, OutputTerminalHandle, WireDestructorHandle,
} from './materials';

export class GateMaskSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(BuildArea)((area) => {
            if (this.$engine.mouse.name === 'none') {
                return;
            }
            this.$engine.entities.forEvery(GateMask)((mask) => {
                mask.destroy();
            });
            this.$engine.entities.forEvery(GateCreatorHandle)(() => {
                if (entityContainsPoint(area, this.$engine.mouse)) {
                    this.$engine.entities.create(GateMask, {
                        x: this.$engine.mouse.x,
                        y: this.$engine.mouse.y,
                    });
                    return;
                }
            });
        });
    }
}

export class WireDestructorHandleSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(WireDestructorHandle)((handle) => {
            this.$engine.viewport.drawLine({
                points: handle.points,
                rendering: { colour: 'RED' },
            });
        });
    }
}

export class OutputTerminalHandleSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(OutputTerminalHandle)((handle) => {
            const { shape, rendering } = fromTerminalHandleToWireRendering(handle, handle.input);
            this.$engine.viewport.drawShape({ shape, rendering });
        });
    }
}

export class InputTerminalHandleSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(InputTerminalHandle)((handle) => {
            const { shape, rendering } = fromTerminalHandleToWireRendering(handle, handle.output);
            this.$engine.viewport.drawShape({ shape, rendering });
        });
    }
}

const fromTerminalHandleToWireRendering = (handle: IEntity, terminal: IEntity) => {
    const handlePose = handle.copy(Pose);
    const terminalPose = terminal.copy(Pose);
    const pose = {
        x: (handlePose.x + terminalPose.x) / 2,
        y: (handlePose.y + terminalPose.y) / 2,
        a: Math.atan2(handlePose.y - terminalPose.y, handlePose.x - terminalPose.x),
    };
    const length = getEuclideanDistanceBetweenPoints(handlePose, terminalPose);
    const shape = transformShape({ points: [
        { x: length / 2, y: 5 },
        { x: -length / 2, y: 5 },
        { x: -length / 2, y: -5 },
        { x: length / 2, y: -5 },
    ]}, pose);
    const rendering = { colour: 'WHITE' };
    return { shape, rendering };
};
