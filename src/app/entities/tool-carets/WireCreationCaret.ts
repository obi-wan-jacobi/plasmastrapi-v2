import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../../engine/concretes/components/ShapeComponent';
import ToolCaret from '../../abstracts/ToolCaret';
import Wire from '../circuit-elements/Wire';

export default class WireCreationCaret extends ToolCaret {

    public wire: Wire;

    constructor(position: IPosition2D) {
        super(position);
        this.add(RenderingComponent, { colour: HTML5_COLOUR.LIGHTGREEN });
        this.add(ShapeComponent, new Rectangle({ width: 10, height: 10 }));
    }

    public unload(): void {
        super.unload();
        this.wire.unload();
    }

}
