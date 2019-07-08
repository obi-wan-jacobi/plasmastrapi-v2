import { ToolButton } from './editor';
import { Gate } from './gates';
import { Machine, PowerSupply } from './machines';
import { ActuatorSystem, GateSystem, MachineSystem, SensorSystem } from '../systems';
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
        this.$engine.add(ActuatorSystem);
        this.$engine.add(SensorSystem);
        this.$engine.add(GateSystem);
        this.$engine.add(MachineSystem);
    }
}

export class StopButton extends SceneButton {

    public constructor() {
        super(Object.assign({ label: 'stop' }, arguments[0]));
        this.$disable();
    }

    public $click(): void {
        super.$click();
        this.$engine.remove(ActuatorSystem);
        this.$engine.remove(SensorSystem);
        this.$engine.remove(GateSystem);
        this.$engine.remove(MachineSystem);
        this.$engine.entities.forEvery(ToolButton)((button) => {
            button.$enable();
        });
        this.$engine.entities.forEvery(Terminal)((terminal) => {
            terminal.$enable();
            terminal.off();
        });
        this.$engine.entities.forEvery(Gate)((gate) => {
            gate.$enable();
            gate.off();
        });
        this.$engine.entities.forEvery(Machine)((machine) => {
            machine.off();
        });
    }
}
