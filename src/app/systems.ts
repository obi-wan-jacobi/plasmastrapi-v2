import IEntity from '../engine/interfaces/IEntity';
import { System } from '../engine/abstracts/System';
import Wire from './entities/Wire';
import { PoseComponent, ShapeComponent } from '../engine/components';
import { RivetComponent } from './components';
import { BuildArea, GateMask } from './entities/editor';
import { entityContainsPoint } from '../engine/entities';
import { Gate } from './entities/gates';
import { getEuclideanDistanceBetweenPoints, transformShape } from '../engine/geometry';
import { Machine, Sensor } from './entities/machines';
import { GateCreatorHandle, InputTerminalHandle, OutputTerminalHandle, WireDestructorHandle } from './entities/tools';

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

export class TerminalWireSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(Gate)((gate) => {
            const gatePose = gate.$copy(PoseComponent);
            const inPose = gate.input.$copy(PoseComponent);
            const outPose = gate.output.$copy(PoseComponent);
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

export class ActuatorSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Wire)((wire) => {
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

export class MachineSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Machine)((machine) => {
            machine.once();
        });
    }
}

const fromTerminalHandleToWireRendering = (handle: IEntity, terminal: IEntity) => {
    const handlePose = handle.$copy(PoseComponent);
    const terminalPose = terminal.$copy(PoseComponent);
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

export class RivetSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(RivetComponent)((rivet) => {
            const rendering = rivet.copy();
            const pose = rivet.$entity.$copy(PoseComponent);
            const corners = rivet.$entity.$copy(ShapeComponent).points;
            const points = [
                { x: corners[0].x - 7, y: corners[0].y - 7 },
                { x: corners[1].x + 7, y: corners[1].y - 7 },
                { x: corners[2].x + 7, y: corners[2].y + 7 },
                { x: corners[3].x - 7, y: corners[3].y + 7 },
            ];
            points.forEach((point) => {
                this.$engine.viewport.drawCircle({
                    point: { x: point.x + pose.x, y: point.y + pose.y },
                    radius: rendering.radius,
                    rendering,
                });
            });
        });
    }
}
