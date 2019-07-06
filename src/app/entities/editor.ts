import { ImageRenderingProfile, Pose, Shape, ShapeRenderingProfile } from '../../engine/components';
import { InteractiveElement } from '../../engine/entities';
import { AndGate, Gate, NandGate, OrGate, XorGate } from './gates';
import { InputTerminal, OutputTerminal } from './terminals';
import { GateCreatorHandle, GateDestructorHandle, ToolHandle, WireDestructorHandle } from './tools';
import { Ctor } from '../../framework/types';
import { Button, Panel } from './ui';

export class ToolButton extends Button {

    public constructor({ x, y, src }: { x: number, y: number, src: string }) {
        super(arguments[0]);
        this.$add(ImageRenderingProfile)({ src });
    }

    public $click(): void {
        this.$engine.entities.forEvery(ToolHandle)((handle) => {
            handle.$destroy();
        });
        this.$disable();
    }
}

export class GateCreatorButton extends ToolButton {

    // tslint:disable-next-line:naming-convention
    private __GateCtor: Ctor<Gate, {}>;

    public constructor({ GateCtor }: { GateCtor: Ctor<Gate, {}> }) {
        super(arguments[0]);
        this.__GateCtor = GateCtor;
    }

    public $click(): void {
        super.$click();
        this.$engine.entities.create(GateCreatorHandle, {
            GateCtor: this.__GateCtor,
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class AndGateCreatorButton extends GateCreatorButton {

    public constructor() {
        super(Object.assign({ GateCtor: AndGate, src: './AndGate.png' }, arguments[0]));
    }
}

export class NandGateCreatorButton extends GateCreatorButton {

    public constructor() {
        super(Object.assign({ GateCtor: NandGate, src: './NandGate.png' }, arguments[0]));
    }
}

export class OrGateCreatorButton extends GateCreatorButton {

    public constructor() {
        super(Object.assign({ GateCtor: OrGate, src: './OrGate.png' }, arguments[0]));
    }
}

export class XorGateCreatorButton extends GateCreatorButton {

    public constructor() {
        super(Object.assign({ GateCtor: XorGate, src: './XorGate.png' }, arguments[0]));
    }
}

export class GateDestructorButton extends ToolButton {

    public constructor() {
        super(Object.assign({ src: './TRASHCAN.png' }, arguments[0]));
    }

    public $click(): void {
        super.$click();
        this.$engine.entities.create(GateDestructorHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class WireDestructorButton extends ToolButton {

    public constructor() {
        super(Object.assign({ src: './CUTTER_CLOSED.png' }, arguments[0]));
    }

    public $click(): void {
        super.$click();
        this.$engine.entities.create(WireDestructorHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class GateMask extends InteractiveElement {

    constructor({ x, y }: { x: number, y: number }) {
        super(Object.assign({ width: 40, height: 40 }, arguments[0]));
        this.$add(ShapeRenderingProfile)({ colour: 'LIGHTBLUE' });
    }
}

export class BuildArea extends Panel {

    public inputs: InputTerminal[] = [];
    public outputs: OutputTerminal[] = [];

    public constructor() {
        super(arguments[0]);
    }

    public init(): void {
        this.__initInputs();
        this.__initOutputs();
    }

    private __initInputs(): void {
        const pose = this.$copy(Pose);
        const { width, height } = this.$copy(Shape).points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        const horizontalSpacer = width / (this.inputs.length + 1);
        const verticalSpacer = 20;
        let cursor = 1;
        for (const input of this.inputs) {
            input.$mutate(Pose)({
                x: pose.x - width / 2 + cursor * horizontalSpacer,
                y: pose.y - height / 2 + verticalSpacer,
                a: 0,
            });
            cursor++;
        }
    }

    private __initOutputs(): void {
        const pose = this.$copy(Pose);
        const { width, height } = this.$copy(Shape).points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        const horizontalSpacer = width / (this.outputs.length + 1);
        const verticalSpacer = 20;
        let cursor = 1;
        for (const output of this.outputs) {
            output.$mutate(Pose)({
                x: pose.x - width / 2 + cursor * horizontalSpacer,
                y: pose.y + height / 2 - verticalSpacer,
                a: 0,
            });
            cursor++;
        }
    }
}
