import Entity from '../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import Rectangle from '../../geometry/concretes/Rectangle';
import RenderingComponent from '../../engine/concretes/components/RenderingComponent';
import ShapeComponent from '../../engine/concretes/components/ShapeComponent';

export default class StageArea extends Entity {

    constructor({ position, width, height }: { position: IPosition2D, width: number, height: number }) {
        super();
        this.add(PoseComponent, position);
        this.add(ShapeComponent, new Rectangle({ width, height }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.BLUE });
    }

}
