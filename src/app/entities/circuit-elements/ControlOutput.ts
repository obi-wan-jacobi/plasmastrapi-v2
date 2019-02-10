import Entity from '../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import IStoreMaster from '../../../engine/interfaces/IStoreMaster';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../../engine/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/components/RenderingComponent';
import ShapeComponent from '../../../engine/components/ShapeComponent';
import { settings } from '../../game.config';

export default class ControlOutput extends Entity {

    public readonly output: OutputTerminal;

    constructor(position: IPosition2D) {
        super();
        this.output = new OutputTerminal(this);
        this.add(PoseComponent, { x: position.x, y: position.y });
        this.add(ShapeComponent, new Rectangle({
            width: settings.gate.width,
            height: settings.gate.height,
        }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.PINK });
    }

    public bind(store: IStoreMaster): void {
        super.bind(store);
        this._store.entities.load(this.output);
    }

    public load(): void {
        super.load();
        this._store.entities.load(this.output);
    }

    public unload(): void {
        super.unload();
        this._store.entities.unload(this.output);
    }

}
