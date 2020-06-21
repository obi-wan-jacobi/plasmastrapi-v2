import Dictionary from '../../data-structures/concretes/Dictionary';
import { STATE } from '../enums/STATE';
import Wire from './Wire';
import { Logical } from './gates';
import { IPose, PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { ShapeComponent } from 'src/framework/geometry/components/ShapeComponent';
import { InteractiveEntity } from 'src/framework/interactive/InteractiveEntity';
import { ImageComponent } from 'src/framework/presentation/components/ImageComponent';
import { LabelComponent } from 'src/framework/presentation/components/LabelComponent';

class InteractiveElement extends InteractiveEntity {

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(Object.assign({ a: 0 }, arguments[0]));
        this.$add(ShapeComponent)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
    }
}

export class Terminal extends InteractiveElement {

    public wires: Dictionary<Wire> = new Dictionary();

    private __state: STATE = STATE.OFF;
    private __src: string;

    constructor({ x, y, src }: { x: number, y: number, src: string }) {
        super(Object.assign({ width: 20, height: 20 }, arguments[0]));
        this.__src = src;
        this.$add(ImageComponent)({ src });
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
        const label = this.$copy(LabelComponent);
        if (label) {
            this.$mutate(LabelComponent)(Object.assign(label, {
                colour: 'GREEN',
            }));
        }
    }

    public low(): void {
        this.__state = STATE.LOW;
        const label = this.$copy(LabelComponent);
        if (label) {
            this.$mutate(LabelComponent)(Object.assign(label, {
                colour: 'RED',
            }));
        }
    }

    public off(): void {
        this.__state = STATE.OFF;
        const label = this.$copy(LabelComponent);
        if (label) {
            this.$mutate(LabelComponent)(Object.assign(label, {
                colour: 'WHITE',
            }));
        }
    }

    public move(pose: IPose): void {
        this.$mutate(PoseComponent)(pose);
        this.wires.forEach((wire) => {
            wire.updatePose();
            wire.updateShape();
        });
    }

    public $mouseenter(): void {
        this.$mutate(ImageComponent)({ src: './Terminal_hovered.png' });
    }

    public $mouseleave(): void {
        this.$mutate(ImageComponent)({ src: this.__src });
    }

    public $destroy(): void {
        this.wires.forEach((wire) => {
            wire.$destroy();
        });
        return super.$destroy();
    }
}

export class InputTerminal extends Terminal {

    public constructor({ gate, x, y }: { gate: Logical, x: number, y: number }) {
        super(Object.assign({ src: './Terminal_in.png' }, arguments[0]));
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
