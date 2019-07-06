import IEntity from '../engine/interfaces/IEntity';
import { System } from '../engine/abstracts/System';
import { Pose } from '../engine/components';
import { BuildArea, GateMask } from './entities/editor';
import { entityContainsPoint } from '../engine/entities';
import { Gate } from './entities/gates';
import { getEuclideanDistanceBetweenPoints, transformShape } from '../engine/geometry';
import { Motor, Sensor } from './entities/machines';
import { GateCreatorHandle, InputTerminalHandle, OutputTerminalHandle, WireDestructorHandle } from './entities/tools';
import { Wire } from './entities/wires';

export class GateMaskSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(BuildArea)((area) => {
            if (this.$engine.mouse.name === 'none') {
                return;
            }
            this.$engine.entities.forEvery(GateMask)((mask) => {
                mask.$destroy();
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

export class MotorSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Wire)((wire) => {
            if (wire.input.$gate) {
                return;
            }
            if (wire.output.isHigh) {
                wire.input.high();
            } else if (wire.output.isLow) {
                wire.input.low();
            } else {
                wire.input.off();
            }
        });
    }
}

export class SensorSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Sensor)((sensor) => {
            sensor.once();
        });
    }
}

export class GateSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Gate)((gate) => {
            gate.once();
        });
    }
}

export class TerminalWireSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(Gate)((gate) => {
            const gatePose = gate.$copy(Pose);
            const inPose = gate.input.$copy(Pose);
            const outPose = gate.output.$copy(Pose);
            const wire = { points: [
                { x: 5, y: 5 },
                { x: -5, y: 5 },
                { x: -5, y: -5 },
                { x: 5, y: -5 },
            ]};
            const rendering = { colour: 'WHITE', opacity: 1 };
            this.$engine.viewport.drawShape({
                shape: transformShape(wire, {
                    x: (gatePose.x + inPose.x) / 2,
                    y: (gatePose.y + inPose.y) / 2 + 5,
                    a: 0,
                }),
                rendering,
            });
            this.$engine.viewport.drawShape({
                shape: transformShape(wire, {
                    x: (gatePose.x + outPose.x) / 2,
                    y: (gatePose.y + outPose.y) / 2 - 5,
                    a: 0,
                }),
                rendering,
            });
        });
    }
}

const fromTerminalHandleToWireRendering = (handle: IEntity, terminal: IEntity) => {
    const handlePose = handle.$copy(Pose);
    const terminalPose = terminal.$copy(Pose);
    const pose = {
        x: (handlePose.x + terminalPose.x) / 2,
        y: (handlePose.y + terminalPose.y) / 2,
        a: Math.atan2(handlePose.y - terminalPose.y, handlePose.x - terminalPose.x),
    };
    const length = getEuclideanDistanceBetweenPoints(handlePose, terminalPose);
    const shape = transformShape({ points: [
        { x: length / 2, y: 2 },
        { x: -length / 2, y: 2 },
        { x: -length / 2, y: -2 },
        { x: length / 2, y: -2 },
    ]}, pose);
    const rendering = { colour: 'WHITE' };
    return { shape, rendering };
};
