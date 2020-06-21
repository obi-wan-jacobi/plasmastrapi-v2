import { Digital } from '../abstracts/Digital';
import Unique from 'src/data-structures/abstracts/Unique';
import Dictionary from 'src/data-structures/concretes/Dictionary';
import { IPose, PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { InteractiveEntity } from 'src/framework/interactive/InteractiveEntity';
import { ImageComponent } from 'src/framework/presentation/components/ImageComponent';
import { InputTerminal, OutputTerminal } from './terminals';
import { ToolHandle } from './tools';

export class AndGate extends Digital {

    public once(): void {
        const sources = this.sources();
        if (sources.find((source) => source.isLow)) {
            return this.low();
        }
        if (sources.find((source) => source.isHigh)) {
            return this.high();
        }
        return this.off();
    }
}

export class NandGate extends Digital {

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

export class OrGate extends Digital {

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

export class XorGate extends Digital {

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

export class Gate2 extends InteractiveEntity {

    public input: InputTerminal;
    public output: OutputTerminal;

    constructor({ x, y, src }: { x: number, y: number, src: string }) {
        super(Object.assign({ width: 30, height: 30 }, arguments[0]));
        this.$add(ImageComponent)({ src });
        this.input = this.$engine.entities.create(InputTerminal, { gate: this, x, y: y + 30 });
        this.output = this.$engine.entities.create(OutputTerminal, { x, y: y - 30 });
    }

    public $mousedown(): void {
        const handle = this.$engine.entities.first(ToolHandle)(() => true);
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
