import DraggableComponent from '../../engine/concretes/components/DraggableComponent';
import Entity from '../../engine/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderableShapeComponent from '../../engine/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import StoreMaster from '../../engine/concretes/masters/StoreMaster';

export default class Gate extends Entity {

    private __output: OutputTerminal;
    private __input: InputTerminal;

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.__output = new OutputTerminal(this);
        this.__input = new InputTerminal(this);
        this.add(PoseComponent, { x, y });
        this.add(ShapeComponent, new Rectangle({ width: 40, height: 40 }));
        this.add(RenderableShapeComponent, { colour: HTML5_COLOUR.ORANGE });
        this.add(DraggableComponent);
    }

    public get output(): OutputTerminal {
        return this.__output;
    }

    public get input(): InputTerminal {
        return this.__input;
    }

    public bind(store: StoreMaster): void {
        super.bind(store);
        this._store.entities.load(this.output);
        this._store.entities.load(this.input);
    }

    public load(): void {
        super.load();
        this._store.entities.load(this.output);
        this._store.entities.load(this.input);
    }

    public unload(): void {
        super.unload();
        this._store.entities.unload(this.output);
        this._store.entities.unload(this.input);
    }

}
