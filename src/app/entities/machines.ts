import Entity from '../../engine/Entity';
import { IShape, Label, Pose, Shape, ShapeRenderingProfile } from '../../engine/components';
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
}

export class MachinePart extends Entity {

    public constructor({ x, y, shape }: { x: number, y: number, shape: IShape }) {
        super(arguments[0]);
        this.$add(Pose)({ x, y, a: 0 });
        this.$add(Shape)(shape);
        this.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
    }
}

export class Motor extends InputTerminal {

    private __action: () => void;

    public constructor({ action, label }: { action: () => void, label: string }) {
        super(Object.assign({ x: 0, y: 0 }, arguments[0]));
        this.__action = action;
        this.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
        this.$add(Label)({
            text: label,
            fontSize: 20,
            offset: { x: 15, y: 7 },
        });
    }

    public once(): void {
        if (this.isHigh) {
            this.__action();
        }
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

    public once(): void {
        this.output.low();
        const target = this.$engine.entities.find(TouchActivator)((activator) => {
            return entitiesTouch(this, activator);
        });
        if (target) {
            this.output.high();
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

    private __horizontalRail: MachinePart;
    private __verticalRail: MachinePart;
    private __carriage: TouchActivator;

    private __leftMotor: Motor;
    private __rightMotor: Motor;

    private __leftSensor: TouchSensor;
    private __rightSensor: TouchSensor;
    private __topSensor: TouchSensor;
    private __bottomSensor: TouchSensor;

    public constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.__horizontalRail = this.$engine.entities.create(MachinePart, {
            x, y,
            shape: { points: [
                { x: 150, y: 5 },
                { x: -150, y: 5 },
                { x: -150, y: -5 },
                { x: 150, y: -5 },
            ]},
        });
        this.__carriage = this.$engine.entities.create(TouchActivator, {
            x: x - 130, y,
            shape: { points: [
                { x: 20, y: 30 },
                { x: -20, y: 30 },
                { x: -20, y: -30 },
                { x: 20, y: -30 },
            ]},
        });
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
        this.__leftMotor = this.$engine.entities.create(Motor, { action: () => this.left(), label: 'move-left' });
        this.__rightMotor = this.$engine.entities.create(Motor, { action: () => this.right(), label: 'move-right' });
        this.inputs = [this.__leftMotor, this.__rightMotor];
        this.outputs = [this.__leftSensor.output, this.__rightSensor.output];
    }

    public left(): void {
        const pose = this.__carriage.$copy(Pose);
        if (pose.x <= this.$copy(Pose).x - 130) {
            return;
        }
        this.__carriage.$mutate(Pose)({
            x: pose.x - 1,
            y: pose.y,
            a: pose.a,
        });
    }

    public right(): void {
        const pose = this.__carriage.$copy(Pose);
        if (pose.x >= this.$copy(Pose).x + 130) {
            return;
        }
        this.__carriage.$mutate(Pose)({
            x: pose.x + 1,
            y: pose.y,
            a: pose.a,
        });
    }
}
