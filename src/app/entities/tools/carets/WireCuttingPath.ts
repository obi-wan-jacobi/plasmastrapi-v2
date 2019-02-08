import MouseEventComponent from '../../../../engine/components/MouseEventComponent';
import CurveComponent from '../../../components/CurveComponent';
import Entity from '../../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../../html5/enums/HTML5_COLOUR';
import IPosition2D from '../../../../geometry/interfaces/IPosition2D';
import RenderingComponent from '../../../../engine/components/RenderingComponent';

export default class WireCuttingPath extends Entity {

    constructor({ points }: { points: IPosition2D[] }) {
        super();
        this.add(MouseEventComponent);
        this.add(CurveComponent, { points });
        this.add(RenderingComponent, { colour: HTML5_COLOUR.LIGHTBLUE });
    }

}
