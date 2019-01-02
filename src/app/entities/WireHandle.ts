import Entity from '../../engine/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderablePoseComponent from '../../engine/concretes/components/RenderablePoseComponent';
import RenderableShapeComponent from '../../engine/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';
import TranslatableComponent from '../../engine/concretes/components/TranslatableComponent';
import Wire from './Wire';

export default class WireHandle extends Entity {

    public wire: Wire;

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.add(PoseComponent, { x, y });
        this.add(RenderablePoseComponent, { colour: HTML5_COLOUR.LIGHTGREEN });
        this.add(ShapeComponent, new Rectangle({ width: 10, height: 10 }));
        this.add(RenderableShapeComponent, { colour: HTML5_COLOUR.GREEN });
        const translatable = this.add(TranslatableComponent);
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
