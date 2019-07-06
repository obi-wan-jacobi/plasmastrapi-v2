import { IPose, ImageRenderingProfile, Pose, ShapeRenderingProfile } from '../../engine/components';
import { InteractiveElement } from '../../engine/entities';
import { InputTerminal, OutputTerminal } from './terminals';
import { GatePlacerHandle, ToolHandle } from './tools';

export class Gate extends InteractiveElement {

    public input: InputTerminal;
    public output: OutputTerminal;

    constructor({ x, y, src }: { x: number, y: number, src: string }) {
        super(Object.assign({ width: 30, height: 30 }, arguments[0]));
        this.$add(ImageRenderingProfile)({ src });
        this.input = this.$engine.entities.create(InputTerminal, { gate: this, x, y: y + 30 });
        this.output = this.$engine.entities.create(OutputTerminal, { x, y: y - 30 });
    }

    public once(): void { return; }

    public high(): void {
        this.input.high();
        this.output.high();
    }

    public low(): void {
        this.input.low();
        this.output.low();
    }

    public off(): void {
        this.input.off();
        this.output.off();
    }

    public $mousedown(): void {
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
        this.$mutate(Pose)(pose);
        this.input.move({
            x: pose.x,
            y: pose.y + 30,
            a: 0,
        });
        this.output.move({
            x: pose.x,
            y: pose.y - 30,
            a: 0,
        });
    }

    public $destroy(): void {
        this.input.$destroy();
        this.output.$destroy();
        return super.$destroy();
    }
}

export class AndGate extends Gate {

    public constructor() {
        super(Object.assign({ src: './AndGate.png' }, arguments[0]));
    }

    public once(): void {
        if (!this.input.wires.length) {
            this.off();
            return;
        }
        for (const wire of this.input.wires) {
            if (wire.output.isLow) {
                this.low();
                return;
            }
        }
        this.high();
    }
}

export class NandGate extends Gate {

    public constructor() {
        super(Object.assign({ src: './NandGate.png' }, arguments[0]));
    }

    public once(): void {
        if (!this.input.wires.length) {
            this.off();
            return;
        }
        for (const wire of this.input.wires) {
            if (wire.output.isLow) {
                this.high();
                return;
            }
        }
        this.low();
    }
}

export class OrGate extends Gate {

    public constructor() {
        super(Object.assign({ src: './OrGate.png' }, arguments[0]));
    }

    public once(): void {
        if (!this.input.wires.length) {
            this.off();
            return;
        }
        for (const wire of this.input.wires) {
            if (wire.output.isLow) {
                this.high();
                return;
            }
        }
        this.low();
    }
}

export class XorGate extends Gate {

    public constructor() {
        super(Object.assign({ src: './XorGate.png' }, arguments[0]));
    }

    public once(): void {
        if (!this.input.wires.length) {
            this.off();
            return;
        }
        for (const wire of this.input.wires) {
            if (wire.output.isLow) {
                this.high();
                return;
            }
        }
        this.low();
    }
}
