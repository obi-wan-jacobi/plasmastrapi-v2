import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import DragComponent from '../../engine/concretes/components/DragComponent';
import Entity from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import InputTerminal from './InputTerminal';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import StoreMaster from '../../engine/concretes/masters/StoreMaster';

export default class Gate extends Entity {

    public readonly output: OutputTerminal;
    public readonly input: InputTerminal;

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.output = new OutputTerminal(this);
        this.input = new InputTerminal(this);
        this.add(CursorEventComponent);
        this.add(PoseComponent, { x, y });
        this.add(ShapeComponent, new Rectangle({ width: 40, height: 40 }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.ORANGE });
        this.add(DragComponent);
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
