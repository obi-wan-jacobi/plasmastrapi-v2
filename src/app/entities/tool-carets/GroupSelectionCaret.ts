import IPosition2D from '../../../geometry/interfaces/IPosition2D';
import ToolCaret from '../../abstracts/ToolCaret';

export default class GroupSelectionCaret extends ToolCaret {

    constructor(position: IPosition2D) {
        super(position);
    }

}
