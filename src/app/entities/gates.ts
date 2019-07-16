import { STATE } from '../enums/STATE';
import { IPose, ImageRenderingProfileComponent, PoseComponent } from '../../engine/components';
import { InteractiveElement } from '../../engine/entities';
import { InputTerminal, OutputTerminal } from './terminals';
import { GatePlacerHandle, ToolHandle } from './tools';

export class Gate extends InteractiveElement {

    public input: InputTerminal;
    public output: OutputTerminal;

    private __state: STATE = STATE.OFF;

    constructor({ x, y, src }: { x: number, y: number, src: string }) {
        super(Object.assign({ width: 30, height: 30 }, arguments[0]));
        this.$add(ImageRenderingProfileComponent)({ src });
        this.input = this.$engine.entities.create(InputTerminal, { gate: this, x, y: y + 30 });
        this.output = this.$engine.entities.create(OutputTerminal, { x, y: y - 30 });
    }

    public once(): void { return; }

    public get isHigh(): boolean {
        return this.__state === STATE.HIGH;
    }

    public get isLow(): boolean {
        return this.__state === STATE.LOW;
    }

    public get isOff(): boolean {
        return this.__state === STATE.OFF;
    }

    public high(): void {
        this.__state = STATE.HIGH;
        this.input.high();
        this.output.high();
    }

    public low(): void {
        this.__state = STATE.LOW;
        this.input.low();
        this.output.low();
    }

    public off(): void {
        this.__state = STATE.OFF;
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
        this.$mutate(PoseComponent)(pose);
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
            return this.off();
        }
        const wires = this.input.wires.toArray();
        for (const wire of wires) {
            if (wire.output.isLow) {
                return this.low();
            }
        }
        if (wires.find((wire) => wire.output.isHigh)) {
            this.high();
        } else {
            this.off();
        }
    }
}

export class NandGate extends Gate {

    public constructor() {
        super(Object.assign({ src: './NandGate.png' }, arguments[0]));
    }

    public once(): void {
        if (!this.input.wires.length) {
            return this.off();
        }
        const wires = this.input.wires.toArray();
        for (const wire of wires) {
            if (wire.output.isLow) {
                return this.high();
            }
        }
        if (wires.find((wire) => wire.output.isHigh)) {
            this.low();
        } else {
            this.off();
        }
    }
}

export class OrGate extends Gate {

    public constructor() {
        super(Object.assign({ src: './OrGate.png' }, arguments[0]));
    }

    public once(): void {
        // if (!this.input.wires.length) {
        //     this.off();
        //     return;
        // }
        // for (const wire of this.input.wires) {
        //     if (wire.output.isLow) {
        //         this.high();
        //         return;
        //     }
        // }
        // this.low();
    }
}

export class XorGate extends Gate {

    public constructor() {
        super(Object.assign({ src: './XorGate.png' }, arguments[0]));
    }

    public once(): void {
        // if (!this.input.wires.length) {
        //     this.off();
        //     return;
        // }
        // for (const wire of this.input.wires) {
        //     if (wire.output.isLow) {
        //         this.high();
        //         return;
        //     }
        // }
        // this.low();
    }
}
