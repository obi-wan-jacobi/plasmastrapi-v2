import GateRemovalCaret from '../../tools/carets/GateRemovalCaret';
import IPosition2D from '../../../../geometry/interfaces/IPosition2D';
import ToolButton from '../../../abstracts/ToolButton';

export default class GateRemovalButton extends ToolButton {

    constructor(position: IPosition2D) {
        super({ position, ToolCaretCtor: GateRemovalCaret });
    }

}
