import Entity from '../../engine/Entity';
import {
    AnimatedImageRenderingProfile, IShape, Label, Pose, PoseStepperComponent, Shape, ShapeRenderingProfile,
} from '../../engine/components';
import { entitiesTouch } from '../../engine/entities';
import { InputTerminal, OutputTerminal } from './terminals';

export class PowerSupply extends OutputTerminal {

    public constructor() {
        super(arguments[0]);
        this.$add(Label)({
            text: 'power',
            fontSize: 20,
            offset: { x: 15, y: 7 },
        });
        this.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
    }
}

export class Machine extends Entity {

    public inputs: InputTerminal[] = [];
    public outputs: OutputTerminal[] = [];

    public constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.$add(Pose)({ x, y, a: 0 });
    }

    public once(): void { return; }
    public off(): void { return; }

    public $destroy(): void {
        super.$destroy();
        this.inputs.forEach((input) => input.$destroy());
        this.outputs.forEach((output) => output.$destroy());
    }
}

export class MachinePart extends Entity {

    public constructor({ x, y, shape }: { x: number, y: number, shape: IShape }) {
        super(arguments[0]);
        this.$add(Pose)({ x, y, a: 0 });
        if (shape) {
            this.$add(Shape)(shape);
            this.$add(ShapeRenderingProfile)({ colour: 'WHITE', fillStyle: 'BLACK' });
        }
    }
}

export class ThreadedAxle extends MachinePart {

    private __threads: MachinePart[] = [];

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(arguments[0]);
        for (let i = 0, L = width / 10; i < L; i++) {
            const thread = this.$engine.entities.create(MachinePart, {
                x: x - width / 2 + i * 10 + 5,
                y,
            });
            thread.$add(AnimatedImageRenderingProfile)({
                src: [
                    './threaded-axle-1.png',
                    './threaded-axle-2.png',
                    './threaded-axle-3.png',
                    './threaded-axle-4.png',
                    './threaded-axle-5.png',
                    './threaded-axle-6.png',
                    './threaded-axle-7.png',
                    './threaded-axle-8.png',
                    './threaded-axle-9.png',
                    './threaded-axle-10.png',
                ],
                frame: 0,
                speed: 1,
                cooldown: 0,
                width: 10,
                height,
                isPaused: true,
            });
            this.__threads.push(thread);
        }
    }

    public forward(): void {
        this.__threads.forEach((thread) => {
            const profile = thread.$copy(AnimatedImageRenderingProfile);
            thread.$mutate(AnimatedImageRenderingProfile)(Object.assign(profile, {
                isPaused: false,
                isReversed: false,
            }));
        });
    }

    public reverse(): void {
        this.__threads.forEach((thread) => {
            const profile = thread.$copy(AnimatedImageRenderingProfile);
            thread.$mutate(AnimatedImageRenderingProfile)(Object.assign(profile, {
                isPaused: false,
                isReversed: true,
            }));
        });
    }

    public idle(): void {
        this.__threads.forEach((thread) => {
            const profile = thread.$copy(AnimatedImageRenderingProfile);
            thread.$mutate(AnimatedImageRenderingProfile)(Object.assign(profile, {
                isPaused: true,
            }));
        });
    }

    public $destroy(): void {
        super.$destroy();
        this.__threads.forEach((thread) => {
            thread.$destroy();
        });
    }
}

export class Actuator extends InputTerminal {

    public constructor({ label }: { label: string }) {
        super(Object.assign({ x: 0, y: 0 }, arguments[0]));
        this.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
        this.$add(Label)({
            text: label,
            fontSize: 20,
            offset: { x: 15, y: 7 },
        });
    }
}

export class Sensor extends MachinePart {

    public output: OutputTerminal;

    public constructor({ x, y, shape, label }: { x: number, y: number, shape: IShape, label: string }) {
        super(arguments[0]);
        this.output = this.$engine.entities.create(OutputTerminal, { x: 0, y: 0 });
        this.output.$add(Label)({
            text: label,
            fontSize: 20,
            offset: { x: 15, y: 7 },
        });
        this.output.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
    }

    public get isHigh(): boolean {
        return this.output.isHigh;
    }

    public get isLow(): boolean {
        return this.output.isLow;
    }

    public get isOff(): boolean {
        return this.output.isOff;
    }

    public once(): void {
        const target = this.$engine.entities.find(TouchActivator)((activator) => {
            return entitiesTouch(this, activator);
        });
        if (target) {
            this.output.high();
        } else {
            this.output.low();
        }
    }

    public $destroy(): void {
        super.$destroy();
        this.output.$destroy();
    }
}

export class TouchSensor extends Sensor {

}

export class TouchActivator extends MachinePart {

}

export class ClawMachine extends Machine {

    private __horizontalRail: ThreadedAxle;
    private __verticalRail: MachinePart;
    private __carriage: TouchActivator;

    private __leftMotor: Actuator;
    private __rightMotor: Actuator;

    private __leftSensor: TouchSensor;
    private __rightSensor: TouchSensor;
    private __topSensor: TouchSensor;
    private __bottomSensor: TouchSensor;

    public constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.__horizontalRail = this.$engine.entities.create(ThreadedAxle, { x, y, width: 300, height: 20 });
        this.__carriage = this.$engine.entities.create(TouchActivator, {
            x: x - 130, y,
            shape: { points: [
                { x: 20, y: 30 },
                { x: -20, y: 30 },
                { x: -20, y: -30 },
                { x: 20, y: -30 },
            ]},
        });
        this.__carriage.$add(PoseStepperComponent)({ x: 0, y: 0, a: 0 });
        this.__carriage.$add(ShapeRenderingProfile)({ colour: 'WHITE', fillStyle: 'BLACK', zIndex: 1 });
        this.__leftSensor = this.$engine.entities.create(TouchSensor, {
            x: x - 155, y,
            shape: { points: [
                { x: 5, y: 20 },
                { x: -5, y: 20 },
                { x: -5, y: -20 },
                { x: 5, y: -20 },
            ]},
            label: 'left-sensor',
        });
        this.__rightSensor = this.$engine.entities.create(TouchSensor, {
            x: x + 155, y,
            shape: { points: [
                { x: 5, y: 20 },
                { x: -5, y: 20 },
                { x: -5, y: -20 },
                { x: 5, y: -20 },
            ]},
            label: 'right-sensor',
        });
        this.__leftMotor = this.$engine.entities.create(Actuator, {
            label: 'move-left',
        });
        this.__rightMotor = this.$engine.entities.create(Actuator, {
            label: 'move-right',
        });
        this.inputs = [this.__leftMotor, this.__rightMotor];
        this.outputs = [this.__leftSensor.output, this.__rightSensor.output];
    }

    public once(): void {
        if (this.__leftMotor.isHigh && this.__rightMotor.isHigh) {
            return this.off();
        }
        if (this.__leftMotor.isLow && this.__rightMotor.isLow) {
            return this.off();
        }
        if (this.__leftMotor.isHigh) {
            if (this.__leftSensor.isHigh) {
                return this.off();
            }
            return this.left();
        }
        if (this.__rightMotor.isHigh) {
            if (this.__rightSensor.isHigh) {
                return this.off();
            }
            return this.right();
        }
        return this.off();
    }

    public left(): void {
        this.__carriage.$mutate(PoseStepperComponent)({ x: -1, y: 0, a: 0 });
        this.__horizontalRail.forward();
    }

    public right(): void {
        this.__carriage.$mutate(PoseStepperComponent)({ x: 1, y: 0, a: 0 });
        this.__horizontalRail.reverse();
    }

    public off(): void {
        this.__carriage.$mutate(PoseStepperComponent)({ x: 0, y: 0, a: 0 });
        this.__horizontalRail.idle();
    }
}
