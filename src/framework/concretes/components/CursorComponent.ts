import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import Component from '../../abstracts/Component';
import ICursorPosition from '../../interfaces/ICursorPosition';

export default class CursorComponent
extends Component<{ eventName: CURSOR_EVENT, cursor: ICursorPosition }> {

}
