import { Digital } from '../abstracts/Digital';
import { IDigital } from '../interfaces/IDigital';
import { IPose, PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { InteractiveEntity } from 'src/framework/interactive/InteractiveEntity';
import { ImageComponent } from 'src/framework/presentation/components/ImageComponent';
import { InputTerminal, OutputTerminal } from './terminals';
import { ToolHandle } from './tools';

export class And extends Digital {

    public compute(): void {
        if (this._inputs.find((input) => input.isLow)) {
            return this.low();
        }
        if (this._inputs.find((input) => input.isHigh)) {
            return this.high();
        }
        return this.off();
    }
}

export class Nand extends Digital {

    public compute(): void {
        const high = this._inputs.find((input) => input.isHigh);
        const low = this._inputs.find((input) => input.isLow);
        if (!(high || low)) {
            return this.off();
        }
        if (low) {
            return this.high();
        }
        return this.low();
    }
}

export class Or extends Digital {

    public compute(): void {
        //
    }
}

export class Xor extends Digital {

    public compute(): void {
        //
    }
}

export class Gate extends InteractiveEntity {

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
