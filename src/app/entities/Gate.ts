import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import DraggableComponent from '../../framework/concretes/components/DraggableComponent';
import Entity from '../../framework/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderableShapeComponent from '../../framework/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';
import StoreMaster from '../../framework/concretes/masters/StoreMaster';
import TranslatableComponent from '../../framework/concretes/components/TranslatableComponent';

export default class Gate extends Entity {

    private __output: OutputTerminal;
    private __input: InputTerminal;

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.__output = new OutputTerminal(this);
        this.__input = new InputTerminal(this);
        this.components.add(new PoseComponent({ x, y }));
        this.components.add(new ShapeComponent(new Rectangle({ width: 40, height: 40 })));
        this.components.add(new RenderableShapeComponent({ colour: HTML5_COLOUR.ORANGE }));
        this.components.add(new CursorEventComponent());
        this.components.add(new TranslatableComponent());
        this.components.add(new DraggableComponent());
    }

    public get output(): OutputTerminal {
        return this.__output;
    }

    public get input(): InputTerminal {
        return this.__input;
    }

    public bind(store: StoreMaster): void {
        super.bind(store);
        this.$.entities.load(this.output);
        this.$.entities.load(this.input);
    }

    public load(): void {
        super.load();
        this.$.entities.load(this.output);
        this.$.entities.load(this.input);
    }

    public unload(): void {
        super.unload();
        this.$.entities.unload(this.output);
        this.$.entities.unload(this.input);
    }

}
