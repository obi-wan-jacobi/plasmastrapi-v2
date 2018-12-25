import { CURSOR_EVENT } from '../../enums/CURSOR_EVENT';
import Component from '../../abstracts/Component';
import IPosition2D from '../../interfaces/IPosition2D';

export default class CursorEventComponent
extends Component<{ eventName: CURSOR_EVENT, cursor: IPosition2D }> {

    constructor() {
        super({
            eventName: CURSOR_EVENT.UNDEFINED,
            cursor: {
                x: -1,
                y: -1
            }
        });
    }

}
