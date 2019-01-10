import CursorEventComponent from '../../../engine/concretes/components/CursorEventComponent';
import Entity from '../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import PoseComponent from '../../../engine/concretes/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../../engine/concretes/components/ShapeComponent';
import TranslationComponent from '../../../engine/concretes/components/TranslationComponent';
import Wire from '../Wire';

export default class WireCreationCaret extends Entity {

    public wire: Wire;

    constructor(position: IPosition2D) {
        super();
        this.add(CursorEventComponent);
        this.add(PoseComponent, { x: position.x, y: position.y });
        this.add(RenderingComponent, { colour: HTML5_COLOUR.LIGHTGREEN });
        this.add(ShapeComponent, new Rectangle({ width: 10, height: 10 }));
        const translatable = this.add(TranslationComponent);
        translatable.set( {
            previous: {
                cursor: { x: position.x, y: position.y },
            },
        });

    }

    public unload(): void {
        super.unload();
        this.wire.unload();
    }

}
