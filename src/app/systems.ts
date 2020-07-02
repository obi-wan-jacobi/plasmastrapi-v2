import IEntity from '../engine/interfaces/IEntity';
import { System } from '../engine/abstracts/System';
import Wire, { WireDestructorHandle } from './entities/Wire';
import { RivetComponent } from './components';
import { Contraption, Sensor } from './entities/contraptions';
import { BuildArea, GateMask } from './entities/designer';
import { Digital, GateCreatorHandle } from './entities/gates';
import { getEuclideanDistanceBetweenPoints, transformShape } from '../framework/helpers/geometry';
import { PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { ShapeComponent } from 'src/framework/geometry/components/ShapeComponent';
import { entityContainsPoint } from 'src/framework/helpers/entities';
import { InputTerminalHandle, OutputTerminalHandle } from './entities/terminals';

export class WireDestructorHandleSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(WireDestructorHandle)((handle) => {
            this.$engine.viewport.drawLine({
                path: handle.points,
                styling: { colour: 'RED' },
            });
        });
    }
}

export class OutputTerminalHandleSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(OutputTerminalHandle)((handle) => {
            const { shape, styling } = fromTerminalHandleToWirestyling(handle, handle.input);
            this.$engine.viewport.drawShape({ path: shape.points, styling });
        });
    }
}

export class InputTerminalHandleSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(InputTerminalHandle)((handle) => {
            const { shape, styling } = fromTerminalHandleToWirestyling(handle, handle.output);
            this.$engine.viewport.drawShape({ path: shape.points, styling });
        });
    }
}

export class TerminalWireSystem extends System {

    public draw(): void {
        this.$engine.entities.forEvery(Digital)((gate) => {
            const gatePose = gate.$copy(PoseComponent);
            const inPose = gate.input.$copy(PoseComponent);
            const outPose = gate.output.$copy(PoseComponent);
            const wire = { points: [
                { x: 5, y: 5 },
                { x: -5, y: 5 },
                { x: -5, y: -5 },
                { x: 5, y: -5 },
            ]};
            const styling = { colour: 'WHITE', opacity: 1 };
            this.$engine.viewport.drawShape({
                path: transformShape(wire, {
                    x: (gatePose.x + inPose.x) / 2,
                    y: (gatePose.y + inPose.y) / 2 + 5,
                    a: 0,
                }).points,
                styling,
            });
            this.$engine.viewport.drawShape({
                path: transformShape(wire, {
                    x: (gatePose.x + outPose.x) / 2,
                    y: (gatePose.y + outPose.y) / 2 - 5,
                    a: 0,
                }).points,
                styling,
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

export class DigitalSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Digital)((gate) => {
            gate.once();
        });
    }
}

export class ContraptionSystem extends System {

    public once(): void {
        this.$engine.entities.forEvery(Contraption)((contraption) => {
            contraption.once();
        });
    }
}

const fromTerminalHandleToWirestyling = (handle: IEntity, terminal: IEntity) => {
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
    const styling = { colour: 'WHITE' };
    return { shape, styling };
};

export class RivetSystem extends System {

    public draw(): void {
        this.$engine.components.forEvery(RivetComponent)((rivet) => {
            const styling = rivet.copy();
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
                    position: { x: point.x + pose.x, y: point.y + pose.y },
                    radius: styling.radius,
                    styling,
                });
            });
        });
    }
}
