import Entity from '../Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import LineComponent from '../components/LineComponent';
import RenderingComponent from '../components/RenderingComponent';

export default class LineDrawing extends Entity {

    constructor({ points }: { points: IPosition2D[] }) {
        super();
        this.add(LineComponent, { points });
        this.add(RenderingComponent, { colour: HTML5_COLOUR.LIGHTBLUE });
    }

}
