import { IPoint, Pose, ShapeRenderingProfile } from '../../engine/components';
import { BuildArea, GateCreatorButton, GateDestructorButton, WireDestructorButton } from './editor';
import { InteractiveElement, entityContainsPoint, entityTouchesLine } from '../../engine/entities';
import { Gate } from './gates';
import { InputTerminal, OutputTerminal } from './terminals';
import { Ctor } from '../../framework/types';
import { Wire } from './wires';

export class ToolHandle extends InteractiveElement {

    constructor({ x, y }: { x: number, y: number }) {
        super(Object.assign({ width: 10, height: 10 }, arguments[0]));
    }

    public $mousemove(): void {
        this.$mutate(Pose)({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            a: 0,
        });
    }

    public $click(): void {
        this.$engine.entities.forEvery(BuildArea)((area) => {
            if (entityContainsPoint(area, this.$engine.mouse)) {
                this.action();
            }
        });
        this.$destroy();
    }

    public action(): void { return; }
}

export class GateCreatorHandle extends ToolHandle {

    // tslint:disable-next-line:naming-convention
    private __GateCtor: Ctor<Gate, {}>;

    constructor({ GateCtor, x, y }: { GateCtor: Ctor<Gate, {}>, x: number, y: number }) {
        super(arguments[0]);
        this.$add(ShapeRenderingProfile)({ colour: 'YELLOW' });
        this.__GateCtor = GateCtor;
    }

    public action(): void {
        this.$engine.entities.create(this.__GateCtor, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }

    public $destroy(): void {
        super.$destroy();
        this.$engine.entities.forEvery(GateCreatorButton)((button) => {
            button.$enable();
        });
    }
}

export class GateDestructorHandle extends ToolHandle {

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.$add(ShapeRenderingProfile)({ colour: 'ORANGE' });
    }

    public action(): void {
        const target = this.$engine.entities.find(Gate)((gate) => {
            return entityContainsPoint(gate, this.$engine.mouse);
        });
        if (target) {
            target.$destroy();
        }
    }

    public $destroy(): void {
        super.$destroy();
        this.$engine.entities.forEvery(GateDestructorButton)((button) => {
            button.$enable();
        });
    }
}

export class WireDestructorHandle extends ToolHandle {

    public points: IPoint[] = [];

    private __isCuttingActive: boolean = false;

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.$add(ShapeRenderingProfile)({ colour: 'RED' });
    }

    public $mousedown(): void {
        this.__isCuttingActive = true;
    }

    public $mousemove(): void {
        super.$mousemove();
        if (!this.__isCuttingActive) {
            return;
        }
        this.points.push({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }

    public $destroy(): void {
        super.$destroy();
        this.$engine.entities.forEvery(WireDestructorButton)((button) => {
            button.$enable();
        });
        this.$engine.entities.forEvery(Wire)((wire) => {
            if (entityTouchesLine(wire, this.points)) {
                wire.$destroy();
            }
        });
    }
}

export class GatePlacerHandle extends ToolHandle {

    public gate: Gate;

    constructor({ x, y, gate }: { x: number, y: number, gate: Gate }) {
        super(arguments[0]);
        this.$add(ShapeRenderingProfile)({ colour: 'LIGHTBLUE' });
        this.gate = gate;
    }

    public $mousemove(): void {
        this.$engine.entities.forEvery(BuildArea)((area) => {
            if (!entityContainsPoint(area, this.$engine.mouse)) {
                this.$destroy();
                return;
            }
            super.$mousemove();
            this.gate.move({
                x: this.$engine.mouse.x,
                y: this.$engine.mouse.y,
                a: 0,
            });
        });
    }
}

export class OutputTerminalHandle extends ToolHandle {

    public input: InputTerminal;

    constructor({ x, y, input }: { x: number, y: number, input: InputTerminal }) {
        super(arguments[0]);
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
