import DragComponent from '../../components/DragComponent';
import Entity, { EntityHas } from '../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import IStoreMaster from '../../../engine/interfaces/IStoreMaster';
import InputTerminal from './InputTerminal';
import MouseEventComponent from '../../../engine/components/MouseEventComponent';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../../engine/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/components/RenderingComponent';
import ShapeComponent from '../../../engine/components/ShapeComponent';
import { settings } from '../../game.config';

@EntityHas(MouseEventComponent)
@EntityHas(DragComponent)
export default class Gate extends Entity {

    public readonly output: OutputTerminal;
    public readonly input: InputTerminal;

    constructor(position: IPosition2D) {
        super();
        this.output = new OutputTerminal(this);
        this.input = new InputTerminal(this);
        this.add(PoseComponent, { x: position.x, y: position.y });
        this.add(ShapeComponent, new Rectangle({
            width: settings.gate.width,
            height: settings.gate.height,
        }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.ORANGE });
    }

    public bind(store: IStoreMaster): void {
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
