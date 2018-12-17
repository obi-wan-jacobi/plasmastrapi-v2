import ICursorPosition from '../../../interfaces/ICursorPosition';
import IMouseCommand from '../../../interfaces/IMouseCommand';
import Invocable from '../../../abstracts/Invocable';

export default class LeftMouseUpCommand extends Invocable<ICursorPosition, void>
implements IMouseCommand {

}
