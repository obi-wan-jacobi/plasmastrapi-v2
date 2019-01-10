import Button from '../../abstracts/Button';
import IPosition2D from '../../../geometry/interfaces/IPosition2D';

export default class GateCreationButton extends Button {

    constructor(position: IPosition2D) {
        super(position);
    }
}
