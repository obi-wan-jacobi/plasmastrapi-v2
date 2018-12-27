import Command from '../commands/Command';
import Component from '../../abstracts/Component';
import CursorEventComponent from './CursorEventComponent';
import ICommand from '../../interfaces/ICommand';

export default class HoverableComponent
extends Component<{
    onEnable: ICommand<CursorEventComponent, void>,
    onDisable: ICommand<CursorEventComponent, void>,
    onTranslate: ICommand<CursorEventComponent, void>
}> {

    constructor({ onEnable, onDisable, onTranslate }: {
        onEnable?: ICommand<CursorEventComponent, void>,
        onDisable?: ICommand<CursorEventComponent, void>,
        onTranslate?: ICommand<CursorEventComponent, void>,
   }) {
        super({
            onEnable: onEnable || new Command({ method: (component: CursorEventComponent): void => undefined }),
            onDisable: onDisable || new Command({ method: (component: CursorEventComponent): void => undefined }),
            onTranslate: onTranslate || new Command({ method: (component: CursorEventComponent): void => undefined })
        });
    }

}
