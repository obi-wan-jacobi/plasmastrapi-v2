import Wire from './Wire';
import { Contraption, PowerSupply } from './contraptions';
import { Player } from './player';
import IEntity from 'src/engine/interfaces/IEntity';
import { IPoint, PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { ShapeComponent } from 'src/framework/geometry/components/ShapeComponent';
import { entityContainsPoint, entityTouchesLine } from 'src/framework/helpers/entities';
import { ImageComponent } from 'src/framework/presentation/components/ImageComponent';
import { StyleComponent } from 'src/framework/presentation/components/StyleComponent';
import { InputTerminal, OutputTerminal } from './terminals';
import { Ctor } from '../../data-structures/types';
import { Button, Panel, UIElement } from './ui';

export class ToolButton extends Button {

    // tslint:disable-next-line:naming-convention
    private __Tool: Ctor<Tool, {}>;

    public constructor({ x, y, src, ToolCtor }: { x: number, y: number, src: string, ToolCtor: Ctor<Tool, {}> }) {
        super(arguments[0]);
        this.$add(ImageComponent)({ src });
        this.__Tool = ToolCtor;
    }

    public $click(): void {
        this.$engine.entities.create(this.__Tool);
    }
}

export class DigitalElement extends UIElement {

}

export abstract class Tool extends UIElement {

    public constructor({ x, y, src }: { x: number, y: number, src?: string }) {
        super(arguments[0]);
        if (src) {
            this.$add(ImageComponent)({ src });
        }
    }

    public $mousemove(): void {
        this.$patch(PoseComponent)({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }

    public $click(): void {
        this.$destroy();
    }
}

export class CreatorTool<T extends DigitalElement> extends Tool {

    // tslint:disable-next-line:naming-convention
    private __DigitalElement: Ctor<T, {}>;

    constructor({ x, y, DigitalElementCtor }: { x: number, y: number, DigitalElementCtor: Ctor<T, {}> }) {
        super(arguments[0]);
        this.$add(StyleComponent)({ colour: 'YELLOW' });
        this.__DigitalElement = DigitalElementCtor;
    }

    public $mouseup(): void {
        this.$engine.entities.create(this.__DigitalElement, {
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class DestructorTool extends Tool {

    constructor({ x, y }: { x: number, y: number }) {
        super(Object.assign({ width: 10, height: 10 }, arguments[0]));
        this.$add(StyleComponent)({ colour: 'ORANGE' });
    }

    public $click(): void {
        super.$click();
        const target = this.$engine.entities.first(DigitalElement)((element) => {
            return entityContainsPoint(element, this.$engine.mouse);
        });
        if (target) {
            target.$destroy();
        }
    }
}

export class PlacerTool extends Tool {

    private __element: DigitalElement;

    constructor({ x, y, element }: { x: number, y: number, element: DigitalElement }) {
        super(arguments[0]);
        this.$add(StyleComponent)({ colour: 'LIGHTBLUE' });
        this.__element = element;
    }

    public $mousemove(): void {
        super.$mousemove();
        this.__element.$patch(PoseComponent)({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }
}

export class WireCutterTool extends Tool {

    public points: IPoint[] = [];

    private __isCuttingActive: boolean = false;

    constructor({ x, y }: { x: number, y: number }) {
        super(arguments[0]);
        this.$add(StyleComponent)({ colour: 'RED' });
    }

    public $mousedown(): void {
        this.__isCuttingActive = true;
    }

    public $mousemove(): void {
        super.$mousemove();
        if (!this.__isCuttingActive) {
            return;
        }
        this.points.push({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
        });
    }

    public $click(): void {
        super.$click();
        this.$engine.entities.forEvery(Wire)((wire) => {
            if (entityTouchesLine(wire, this.points)) {
                wire.$destroy();
            }
        });
    }
}

export class DesignerToolbar extends Panel {

    private __buttons: ToolButton[] = [];

    public constructor() {
        super(arguments[0]);
        this.__initButtons();
    }

    public $destroy(): void {
        super.$destroy();
        this.__buttons.forEach((button) => button.$destroy());
    }

    private __initButtons(): void {
        this.__buttons = [
            this.$engine.entities.create(AndGateCreatorButton, { x: 30, y: 30 }),
            this.$engine.entities.create(NandGateCreatorButton, { x: 80, y: 30 }),
            this.$engine.entities.create(OrGateCreatorButton, { x: 130, y: 30 }),
            this.$engine.entities.create(XorGateCreatorButton, { x: 180, y: 30 }),
            this.$engine.entities.create(WireDestructorButton, { x: 720, y: 30 }),
            this.$engine.entities.create(GateDestructorButton, { x: 770, y: 30 }),
        ];
    }
}

export class BuildArea extends Panel {

    private __power: PowerSupply;
    private __inputs: InputTerminal[] = [];
    private __outputs: OutputTerminal[] = [];

    public constructor({ x, y, width, height, inputs, outputs }: {
        x: number, y: number, width: number, height: number, inputs: InputTerminal[], outputs: OutputTerminal[],
    }) {
        super(arguments[0]);
        this.__inputs = inputs;
        this.__outputs = outputs;
        this.__init();
    }

    public $destroy(): void {
        super.$destroy();
        this.__power.$destroy();
    }

    private __init(): void {
        this.__initPowerSupply();
        this.__initInputs();
        this.__initOutputs();
    }

    private __initPowerSupply(): void {
        const pose = this.$copy(PoseComponent);
        const { width, height } = this.$copy(ShapeComponent)
            .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        this.__power = this.$engine.entities.create(PowerSupply, {
            x: pose.x - width / 2 + 20,
            y: pose.y + height / 2 - 30,
        });
    }

    private __initInputs(): void {
        const pose = this.$copy(PoseComponent);
        const { width, height } = this.$copy(ShapeComponent)
            .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        const horizontalSpacer = width / 4;
        const verticalSpacer = 20;
        let cursor = 1;
        let row = 1;
        for (const input of this.__inputs) {
            input.$mutate(PoseComponent)({
                x: pose.x - width / 2 + cursor * horizontalSpacer - 50,
                y: pose.y - height / 2 + row * verticalSpacer,
                a: 0,
            });
            cursor++;
            if (cursor % 4 === 0) {
                cursor = 1;
                row++;
            }
        }
    }

    private __initOutputs(): void {
        const pose = this.$copy(PoseComponent);
        const { width, height } = this.$copy(ShapeComponent)
            .points.map((p) => ({ width: 2 * p.x, height: 2 * p.y }))[0];
        const horizontalSpacer = width / 4;
        const verticalSpacer = 20;
        let cursor = 1;
        let row = 1;
        for (const output of this.__outputs) {
            output.$mutate(PoseComponent)({
                x: pose.x - width / 2 + cursor * horizontalSpacer - 50,
                y: pose.y + height / 2 - row * verticalSpacer,
                a: 0,
            });
            cursor++;
            if (cursor % 4 === 0) {
                cursor = 1;
                row++;
            }
        }
    }
}

export class Designer extends Panel {

    private __toolbar: DesignerToolbar;
    private __buildArea: BuildArea;
    private __player: Player;

    public constructor({ contraption }: { contraption: Contraption }) {
        super(arguments[0]);
        this.__toolbar = this.$engine.entities.create(DesignerToolbar);
        this.__buildArea = this.$engine.entities.create(BuildArea, {
            x: 400,
            y: 340,
            width: 800,
            height: 560,
            inputs: contraption.inputs,
            outputs: contraption.outputs,
        });
        this.__player = this.$engine.entities.create(Player);
    }

    public $destroy(): void {
        super.$destroy();
        this.__toolbar.$destroy();
        this.__buildArea.$destroy();
        this.__player.$destroy();
    }
}
