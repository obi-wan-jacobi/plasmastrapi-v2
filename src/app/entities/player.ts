import { Contraption, PowerSupply } from './contraptions';
import { ToolButton } from './designer';
import { Logical } from './gates';
import { ActuatorSystem, ContraptionSystem, GateSystem, SensorSystem } from '../systems';
import { Terminal } from './terminals';
import { ToolHandle } from './tools';
import { Button, Panel } from './ui';

export class LatchButton extends Button {

    public $click(): void {
        this.$engine.entities.forEvery(LatchButton)((button) => {
            button.$enable();
        });
        this.$disable();
    }
}

export class PlayButton extends LatchButton {

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
        this.$engine.entities.forEvery(Logical)((gate) => {
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
        this.$engine.add(ContraptionSystem);
    }
}

export class ResetButton extends LatchButton {

    public constructor() {
        super(Object.assign({ label: 'reset' }, arguments[0]));
        this.$disable();
    }

    public $click(): void {
        super.$click();
        this.$engine.remove(ActuatorSystem);
        this.$engine.remove(SensorSystem);
        this.$engine.remove(GateSystem);
        this.$engine.remove(ContraptionSystem);
        this.$engine.entities.forEvery(ToolButton)((button) => {
            button.$enable();
        });
        this.$engine.entities.forEvery(Terminal)((terminal) => {
            terminal.$enable();
            terminal.off();
        });
        this.$engine.entities.forEvery(Logical)((gate) => {
            gate.$enable();
            gate.off();
        });
        this.$engine.entities.forEvery(Contraption)((contraption) => {
            contraption.off();
            contraption.reset();
        });
    }
}

export class PlayerConsole extends Panel {

    private __buttons: LatchButton[] = [];

    public constructor() {
        super(arguments[0]);
        this.__initButtons();
    }

    public $destroy(): void {
        super.$destroy();
        this.__buttons.forEach((button) => button.$destroy());
    }

    private __initButtons(): void {
        this.$engine.entities.create(PlayButton, { x: 1200, y: 30 });
        this.$engine.entities.create(ResetButton, { x: 1250, y: 30 });
    }
}

export class ContraptionViewer extends Panel {

    private __contraption: Contraption;

    public constructor({ x, y, width, height, contraption }: {
        x: number, y: number, width: number, height: number, contraption: Contraption,
    }) {
        super(arguments[0]);
        this.__contraption = contraption;
    }

    public $destroy(): void {
        super.$destroy();
        this.__contraption.$destroy();
    }
}

export class Player extends Panel {

    private __console: PlayerConsole;
    private __viewer: ContraptionViewer;

    public constructor({ contraption }: { contraption: Contraption }) {
        super(arguments[0]);
        this.__console = this.$engine.entities.create(PlayerConsole);
        this.__viewer = this.$engine.entities.create(ContraptionViewer, {
            x: 1040,
            y: 340,
            width: 440,
            height: 560,
            contraption,
        });
    }

    public $destroy(): void {
        super.$destroy();
        this.__console.$destroy();
        this.__viewer.$destroy();
    }
}
