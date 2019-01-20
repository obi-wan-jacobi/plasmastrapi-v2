import Component from '../../engine/abstracts/Component';
import IPosition2D from '../../geometry/interfaces/IPosition2D';

export default class CurveComponent extends Component<{ points: IPosition2D[] }> {

    constructor({ points }: { points: IPosition2D[] }) {
        super({ points });
    }

}
