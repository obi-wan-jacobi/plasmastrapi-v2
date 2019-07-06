import { STATE } from '../enums/STATE';
import { IPose, ImageRenderingProfile, Label, Pose, ShapeRenderingProfile } from '../../engine/components';
import { InteractiveElement } from '../../engine/entities';
import { Gate } from './gates';
import { InputTerminalHandle, OutputTerminalHandle } from './tools';
import { Wire } from './wires';

export class Terminal extends InteractiveElement {

    public wires: Wire[] = [];

    private __state: STATE = STATE.OFF;
    private __src: string;

    constructor({ x, y, src }: { x: number, y: number, src: string }) {
        super(Object.assign({ width: 15, height: 15 }, arguments[0]));
        this.__src = src;
        this.$add(ImageRenderingProfile)({ src });
    }

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
    }

    public low(): void {
        this.__state = STATE.LOW;
    }

    public off(): void {
        this.__state = STATE.OFF;
    }

    public move(pose: IPose): void {
        this.$mutate(Pose)(pose);
        this.wires.forEach((wire) => {
            wire.updatePose();
            wire.updateShape();
        });
    }

    public $mouseenter(): void {
        this.$mutate(ImageRenderingProfile)({ src: './Terminal_hovered.png' });
    }

    public $mouseleave(): void {
        this.$mutate(ImageRenderingProfile)({ src: this.__src });
    }

    public $destroy(): void {
        this.wires.forEach((wire) => {
            wire.$destroy();
        });
        return super.$destroy();
    }
}

export class InputTerminal extends Terminal {

    public $gate: Gate;

    public constructor({ gate, x, y }: { gate: Gate, x: number, y: number }) {
        super(Object.assign({ src: './Terminal_in.png' }, arguments[0]));
        this.$gate = gate;
    }

    public $mousedown(): void {
        this.$engine.entities.create(OutputTerminalHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            input: this,
        });
    }
}

export class OutputTerminal extends Terminal {

    public constructor({ x, y }: { x: number, y: number }) {
        super(Object.assign({ src: './Terminal_out.png' }, arguments[0]));
    }

    public $mousedown(): void {
        this.$engine.entities.create(InputTerminalHandle, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            output: this,
        });
    }

    public high(): void {
        super.high();
        this.wires.forEach((wire) => wire.high());
    }

    public low(): void {
        super.low();
        this.wires.forEach((wire) => wire.low());
    }

    public off(): void {
        super.off();
        this.wires.forEach((wire) => wire.off());
    }
}
