import {
    ImageRenderingProfileComponent, PoseComponent,
    ShapeComponent, ShapeRenderingProfileComponent,
} from '../../engine/components';
import { InteractiveElement } from '../../engine/entities';
import { AndGate, Gate, NandGate, OrGate, XorGate } from './gates';
import { PowerSupply } from './machines';
import { InputTerminal, OutputTerminal } from './terminals';
import { GateCreatorHandle, GateDestructorHandle, ToolHandle, WireDestructorHandle } from './tools';
import { Ctor } from '../../framework/types';
import { Button, Panel } from './ui';

export class ToolButton extends Button {

    public constructor({ x, y, src }: { x: number, y: number, src: string }) {
        super(arguments[0]);
        this.$add(ImageRenderingProfileComponent)({ src });
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
        this.$add(ShapeRenderingProfileComponent)({ colour: 'LIGHTBLUE' });
    }
}

export class BuildArea extends Panel {

    public power: PowerSupply;
    public inputs: InputTerminal[] = [];
    public outputs: OutputTerminal[] = [];

    public constructor() {
        super(arguments[0]);
    }

    public init(): void {
        this.__initPowerSupply();
        this.__initInputs();
        this.__initOutputs();
    }

    private __initPowerSupply(): void {
        const pose = this.$copy(PoseComponent);
        const { width, height } = this.$copy(ShapeComponent)
            .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        this.power = this.$engine.entities.create(PowerSupply, {
            x: pose.x - width / 2 + 20,
            y: pose.y + height / 2 - 30,
        });
    }

    private __initInputs(): void {
        const pose = this.$copy(PoseComponent);
        const { width, height } = this.$copy(ShapeComponent)
            .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        const horizontalSpacer = width / 4;
        const verticalSpacer = 20;
        let cursor = 1;
        let row = 1;
        for (const input of this.inputs) {
            input.$mutate(PoseComponent)({
                x: pose.x - width / 2 + cursor * horizontalSpacer - 50,
                y: pose.y - height / 2 + row * verticalSpacer,
                a: 0,
            });
            cursor++;
            if (cursor % 4 === 0) {
                cursor = 1;
                row++;
            }
        }
    }

    private __initOutputs(): void {
        const pose = this.$copy(PoseComponent);
        const { width, height } = this.$copy(ShapeComponent)
            .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        const horizontalSpacer = width / 4;
        const verticalSpacer = 20;
        let cursor = 1;
        let row = 1;
        for (const output of this.outputs) {
            output.$mutate(PoseComponent)({
                x: pose.x - width / 2 + cursor * horizontalSpacer - 50,
                y: pose.y + height / 2 - row * verticalSpacer,
                a: 0,
            });
            cursor++;
            if (cursor % 4 === 0) {
                cursor = 1;
                row++;
            }
        }
    }
}
