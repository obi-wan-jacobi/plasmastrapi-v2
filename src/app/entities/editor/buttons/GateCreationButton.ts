import GateCreationCaret from '../../tools/carets/GateCreationCaret';
import IPosition2D from '../../../../geometry/interfaces/IPosition2D';
import ToolButton from '../../../abstracts/ToolButton';

export default class GateCreationButton extends ToolButton {

    constructor(position: IPosition2D) {
        super({ position, ToolCaretCtor: GateCreationCaret });
    }
}
