import Entity from '../../engine/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import TranslationComponent from '../../engine/concretes/components/TranslationComponent';
import Wire from './Wire';

export default class WireHandle extends Entity {

    public wire: Wire;

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.add(PoseComponent, { x, y });
        this.add(RenderingComponent, { colour: HTML5_COLOUR.LIGHTGREEN });
        this.add(ShapeComponent, new Rectangle({ width: 10, height: 10 }));
        const translatable = this.add(TranslationComponent);
        translatable.set( {
            previous: {
                cursor: { x, y },
            },
        });

    }

    public unload(): void {
        super.unload();
        this.wire.unload();
    }

}
