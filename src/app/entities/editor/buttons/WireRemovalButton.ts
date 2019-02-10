import IPosition2D from '../../../../geometry/interfaces/IPosition2D';
import ToolButton from '../../../abstracts/ToolButton';
import WireRemovalCaret from '../../tools/carets/WireRemovalCaret';

export default class WireRemovalButton extends ToolButton {

    constructor(position: IPosition2D) {
        super({ position, ToolCaretCtor: WireRemovalCaret });
    }

}
