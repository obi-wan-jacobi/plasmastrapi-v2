import {
    ImageRenderingProfileComponent, PoseComponent,
    ShapeComponent, ShapeRenderingProfileComponent,
} from '../../engine/components';
import { Contraption, PowerSupply } from './contraptions';
import { InteractiveElement } from '../../engine/entities';
import { AndGate, Gate, NandGate, OrGate, XorGate } from './gates';
import { Player } from './player';
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

export class DesignerToolbar extends Panel {

    private __buttons: ToolButton[] = [];

    public constructor() {
        super(arguments[0]);
        this.__initButtons();
    }

    public $destroy(): void {
        super.$destroy();
        this.__buttons.forEach((button) => button.$destroy());
    }

    private __initButtons(): void {
        this.__buttons = [
            this.$engine.entities.create(AndGateCreatorButton, { x: 30, y: 30 }),
            this.$engine.entities.create(NandGateCreatorButton, { x: 80, y: 30 }),
            this.$engine.entities.create(OrGateCreatorButton, { x: 130, y: 30 }),
            this.$engine.entities.create(XorGateCreatorButton, { x: 180, y: 30 }),
            this.$engine.entities.create(WireDestructorButton, { x: 720, y: 30 }),
            this.$engine.entities.create(GateDestructorButton, { x: 770, y: 30 }),
        ];
    }
}

export class BuildArea extends Panel {

    private __power: PowerSupply;
    private __inputs: InputTerminal[] = [];
    private __outputs: OutputTerminal[] = [];

    public constructor({ x, y, width, height, inputs, outputs }: {
        x: number, y: number, width: number, height: number, inputs: InputTerminal[], outputs: OutputTerminal[],
    }) {
        super(arguments[0]);
        this.__inputs = inputs;
        this.__outputs = outputs;
        this.__init();
    }

    public $destroy(): void {
        super.$destroy();
        this.__power.$destroy();
    }

    private __init(): void {
        this.__initPowerSupply();
        this.__initInputs();
        this.__initOutputs();
    }

    private __initPowerSupply(): void {
        const pose = this.$copy(PoseComponent);
        const { width, height } = this.$copy(ShapeComponent)
            .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        this.__power = this.$engine.entities.create(PowerSupply, {
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
        for (const input of this.__inputs) {
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
        for (const output of this.__outputs) {
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

export class Designer extends Panel {

    private __toolbar: DesignerToolbar;
    private __buildArea: BuildArea;
    private __player: Player;

    public constructor({ contraption }: { contraption: Contraption }) {
        super(arguments[0]);
        this.__toolbar = this.$engine.entities.create(DesignerToolbar);
        this.__buildArea = this.$engine.entities.create(BuildArea, {
            x: 400,
            y: 340,
            width: 800,
            height: 560,
            inputs: contraption.inputs,
            outputs: contraption.outputs,
        });
        this.__player = this.$engine.entities.create(Player);
    }

    public $destroy(): void {
        super.$destroy();
        this.__toolbar.$destroy();
        this.__buildArea.$destroy();
        this.__player.$destroy();
    }
}
