import { ShapeRenderingProfile } from '../../engine/components';
import { ToolButton } from './editor';
import { Gate } from './gates';
import { Motor, PowerSupply, Sensor } from './machines';
import { GateSystem, MotorSystem, SensorSystem } from '../systems';
import { Terminal } from './terminals';
import { ToolHandle } from './tools';
import { Button, Panel } from './ui';

export class SceneArea extends Panel {

}

export class SceneButton extends Button {

    public $click(): void {
        this.$engine.entities.forEvery(SceneButton)((button) => {
            button.$enable();
        });
        this.$disable();
    }
}

export class PlayButton extends SceneButton {

    public constructor() {
        super(Object.assign({ label: 'play' }, arguments[0]));
    }

    public $click(): void {
        super.$click();
        this.$engine.entities.forEvery(ToolHandle)((handle) => {
            handle.$destroy();
        });
        this.$engine.entities.forEvery(ToolButton)((button) => {
            button.$disable();
        });
        this.$engine.entities.forEvery(Gate)((gate) => {
            gate.$disable();
        });
        this.$engine.entities.forEvery(Terminal)((terminal) => {
            terminal.$disable();
        });
        this.$engine.entities.forEvery(PowerSupply)((power) => {
            power.high();
        });
        this.$engine.add(MotorSystem);
        this.$engine.add(SensorSystem);
        this.$engine.add(GateSystem);
    }
}

export class StopButton extends SceneButton {

    public constructor() {
        super(Object.assign({ label: 'stop' }, arguments[0]));
        this.$disable();
    }

    public $click(): void {
        super.$click();
        this.$engine.remove(MotorSystem);
        this.$engine.remove(SensorSystem);
        this.$engine.remove(GateSystem);
        this.$engine.entities.forEvery(ToolButton)((button) => {
            button.$enable();
        });
        this.$engine.entities.forEvery(Gate)((gate) => {
            gate.$enable();
        });
        this.$engine.entities.forEvery(Terminal)((terminal) => {
            terminal.$enable();
        });
        this.$engine.entities.forEvery(PowerSupply)((power) => {
            power.off();
        });
        this.$engine.entities.forEvery(Motor)((motor) => {
            motor.off();
        });
        this.$engine.entities.forEvery(Sensor)((sensor) => {
            sensor.output.off();
        });
        this.$engine.entities.forEvery(Gate)((gate) => {
            gate.off();
        });
    }
}
