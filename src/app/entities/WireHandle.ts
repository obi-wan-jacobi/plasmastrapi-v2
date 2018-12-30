import Entity from '../../framework/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderablePoseComponent from '../../framework/concretes/components/RenderablePoseComponent';
import RenderableShapeComponent from '../../framework/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';
import TranslatableComponent from '../../framework/concretes/components/TranslatableComponent';

export default class WireHandle extends Entity {

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

}
