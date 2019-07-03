import Entity from '../engine/Entity';
import { IPoint, IPose, Pose, RenderingProfile, Shape } from '../engine/components';
import { Button, Interactive, entityContainsPoint, entityTouchesLine } from '../engine/entities';
import { getEuclideanDistanceBetweenPoints } from '../engine/geometry';

export class Panel extends Entity {

    constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(arguments[0]);
        this.add(Pose)({ x, y, a: 0 });
        this.add(Shape)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
        this.add(RenderingProfile)({ colour: 'WHITE' });
    }
}

export class SceneArea extends Panel {

}

export class SceneButton extends Button {

    public click(): void {
        this.$engine.entities.forEvery(SceneButton)((button) => {
            button.enable();
        });
        this.disable();
    }
}

export class PlayButton extends Button {

    public click(): void {
        super.click();
        this.$engine.entities.forEvery(ToolHandle)((handle) => {
            handle.destroy();
        });
        this.$engine.entities.forEvery(ToolButton)((button) => {
            button.disable();
        });
        this.$engine.entities.forEvery(Gate)((gate) => {
            gate.disable();
        });
        this.$engine.entities.forEvery(Terminal)((terminal) => {
            terminal.disable();
        });
    }
}

export class StopButton extends Button {

    public click(): void {
        super.click();
        this.$engine.entities.forEvery(ToolButton)((button) => {
            button.enable();
        });
        this.$engine.entities.forEvery(Gate)((gate) => {
            gate.enable();
        });
        this.$engine.entities.forEvery(Terminal)((terminal) => {
            terminal.enable();
        });
    }
}

export class ToolButton extends Button {

    public click(): void {
        this.$engine.entities.forEvery(ToolHandle)((handle) => {
            handle.destroy();
        });
        this.disable();
    }
}

export class GateCreatorButton extends ToolButton {

    public click(): void {
        super.click();
        this.$engine.entities.create(GateCreatorHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class GateDestructorButton extends ToolButton {

    public click(): void {
        super.click();
        this.$engine.entities.create(GateDestructorHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class WireDestructorButton extends ToolButton {

    public click(): void {
        super.click();
        this.$engine.entities.create(WireDestructorHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class GateMask extends Entity {

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(Pose)({ x, y, a: 0 });
        this.add(Shape)({ points: [
            { x: 20, y: 20 },
            { x: -20, y: 20 },
            { x: -20, y: -20 },
            { x: 20, y: -20 },
        ]});
        this.add(RenderingProfile)({ colour: 'LIGHTBLUE' });
    }
}

export class Gate extends Interactive {

    public input: InputTerminal;
    public output: OutputTerminal;

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(Pose)({ x, y, a: 0 });
        this.add(Shape)({ points: [
            { x: 20, y: 20 },
            { x: -20, y: 20 },
            { x: -20, y: -20 },
            { x: 20, y: -20 },
        ]});
        this.add(RenderingProfile)({ colour: 'LIGHTGREEN' });
        this.input = this.$engine.entities.create(InputTerminal, { x, y: y + 40 });
        this.output = this.$engine.entities.create(OutputTerminal, { x, y: y - 40 });
    }

    public mousedown(): void {
        const handle = this.$engine.entities.find(ToolHandle)(() => true);
        if (handle) {
            return;
        }
        this.$engine.entities.create(GatePlacerHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            gate: this,
        });
    }

    public move(pose: IPose): void {
        this.mutate(Pose)(pose);
        this.input.move({
            x: pose.x,
            y: pose.y + 40,
            a: 0,
        });
        this.output.move({
            x: pose.x,
            y: pose.y - 40,
            a: 0,
        });
    }

    public destroy(): void {
        this.input.destroy();
        this.output.destroy();
        return super.destroy();
    }
}

export class ToolHandle extends Interactive {

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(Pose)({ x, y, a: 0 });
        this.add(Shape)({ points: [
            { x: 5, y: 5 },
            { x: -5, y: 5 },
            { x: -5, y: -5 },
            { x: 5, y: -5 },
        ]});
    }

    public mousemove(): void {
        this.mutate(Pose)({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            a: 0,
        });
    }

    public click(): void {
        this.$engine.entities.forEvery(BuildArea)((area) => {
            if (entityContainsPoint(area, this.$engine.mouse)) {
                this.action();
            }
        });
        this.destroy();
    }

    public action(): void { return; }
}

export class GateCreatorHandle extends ToolHandle {

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'YELLOW' });
    }

    public action(): void {
        this.$engine.entities.create(Gate, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }

    public destroy(): void {
        super.destroy();
        this.$engine.entities.forEvery(GateCreatorButton)((button) => {
            button.enable();
        });
    }
}

export class GateDestructorHandle extends ToolHandle {

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'ORANGE' });
    }

    public action(): void {
        const target = this.$engine.entities.find(Gate)((gate) => {
            return entityContainsPoint(gate, this.$engine.mouse);
        });
        if (target) {
            target.destroy();
        }
    }

    public destroy(): void {
        super.destroy();
        this.$engine.entities.forEvery(GateDestructorButton)((button) => {
            button.enable();
        });
    }
}

export class WireDestructorHandle extends ToolHandle {

    public points: IPoint[] = [];

    private __isCuttingActive: boolean = false;

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'RED' });
    }

    public mousedown(): void {
        this.__isCuttingActive = true;
    }

    public mousemove(): void {
        super.mousemove();
        if (!this.__isCuttingActive) {
            return;
        }
        this.points.push({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }

    public destroy(): void {
        super.destroy();
        this.$engine.entities.forEvery(WireDestructorButton)((button) => {
            button.enable();
        });
        this.$engine.entities.forEvery(Wire)((wire) => {
            if (entityTouchesLine(wire, this.points)) {
                wire.destroy();
            }
        });
    }
}

export class GatePlacerHandle extends ToolHandle {

    public gate: Gate;

    constructor({ x, y, gate }: { x: number, y: number, gate: Gate }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'LIGHTBLUE' });
        this.gate = gate;
    }

    public mousemove(): void {
        this.$engine.entities.forEvery(BuildArea)((area) => {
            if (!entityContainsPoint(area, this.$engine.mouse)) {
                this.destroy();
                return;
            }
            super.mousemove();
            this.gate.move({
                x: this.$engine.mouse.x,
                y: this.$engine.mouse.y,
                a: 0,
            });
        });
    }
}

export class Terminal extends Interactive {

    public wires: Wire[] = [];

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(Pose)({ x, y, a: 0 });
        this.add(Shape)({ points: [
            { x: 10, y: 10 },
            { x: -10, y: 10 },
            { x: -10, y: -10 },
            { x: 10, y: -10 },
        ]});
    }

    public move(pose: IPose): void {
        this.mutate(Pose)(pose);
        this.wires.forEach((wire) => {
            wire.updatePose();
            wire.updateShape();
        });
    }

    public destroy(): void {
        this.wires.forEach((wire) => {
            wire.destroy();
        });
        return super.destroy();
    }
}

export class InputTerminal extends Terminal {

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'PINK' });
    }

    public mousedown(): void {
        this.$engine.entities.create(OutputTerminalHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            input: this,
        });
    }
}

export class OutputTerminal extends Terminal {

    public wires: Wire[] = [];

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'YELLOW' });
    }

    public mousedown(): void {
        this.$engine.entities.create(InputTerminalHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            output: this,
        });
    }
}

export class OutputTerminalHandle extends ToolHandle {

    public input: InputTerminal;

    constructor({ x, y, input }: { x: number, y: number, input: InputTerminal }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'WHITE' });
        this.input = input;
    }

    public action(): void {
        const target = this.$engine.entities.find(OutputTerminal)((terminal) => {
            return entityContainsPoint(terminal, this.$engine.mouse);
        });
        if (target) {
            const wire = this.$engine.entities.create(Wire, {
                input: this.input,
                output: target,
            });
            this.input.wires.push(wire);
            target.wires.push(wire);
        }
    }
}

export class InputTerminalHandle extends ToolHandle {

    public output: OutputTerminal;

    constructor({ x, y, output }: { x: number, y: number, output: OutputTerminal }) {
        super(arguments[0]);
        this.add(RenderingProfile)({ colour: 'WHITE' });
        this.output = output;
    }

    public action(): void {
        const target = this.$engine.entities.find(InputTerminal)((terminal) => {
            return entityContainsPoint(terminal, this.$engine.mouse);
        });
        if (target) {
            const wire = this.$engine.entities.create(Wire, {
                input: target,
                output: this.output,
            });
            this.output.wires.push(wire);
            target.wires.push(wire);
        }
    }
}

export class Wire extends Entity {

    public input: InputTerminal;
    public output: OutputTerminal;

    constructor({ input, output }: { input: InputTerminal, output: OutputTerminal }) {
        super(arguments[0]);
        this.input = input;
        this.output = output;
        this.add(RenderingProfile)({ colour: 'WHITE' });
        this.updatePose();
        this.updateShape();
    }

    public updatePose(): void {
        const inPose = this.input.copy(Pose);
        const outPose = this.output.copy(Pose);
        const x = (inPose.x + outPose.x) / 2;
        const y = (inPose.y + outPose.y) / 2;
        const a = Math.atan2(inPose.y - outPose.y, inPose.x - outPose.x);
        this.add(Pose)({ x, y, a });
    }

    public updateShape(): void {
        const inPose = this.input.copy(Pose);
        const outPose = this.output.copy(Pose);
        const length = getEuclideanDistanceBetweenPoints(inPose, outPose);
        this.add(Shape)({ points: [
            { x: length / 2, y: 5 },
            { x: - length / 2, y: 5 },
            { x: - length / 2, y: -5 },
            { x: length / 2, y: -5 },
        ]});
    }

}

export class BuildArea extends Panel {

    public inputs: InputTerminal[] = [];
    public outputs: OutputTerminal[] = [];
}
