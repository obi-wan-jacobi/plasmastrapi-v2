import Component from '../../abstracts/Component';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';

export default class LineComponent extends Component<{ points: IPosition2D[] }> {

    constructor({ points }: { points: IPosition2D[] }) {
        super({ points });
    }

}
