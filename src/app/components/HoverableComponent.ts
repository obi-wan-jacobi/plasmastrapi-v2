import Component from '../../framework/abstracts/Component';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import ICommand from '../../framework/interfaces/ICommand';
import { Optional } from '../../framework/types/Optional';

export default class HoverableComponent
extends Component<{
    onEnable: Optional<ICommand<CursorEventComponent, void>>,
    onDisable: Optional<ICommand<CursorEventComponent, void>>,
    onTranslate: Optional<ICommand<CursorEventComponent, void>>
}> {

    constructor({ onEnable, onDisable, onTranslate }: {
        onEnable?: ICommand<CursorEventComponent, void>,
        onDisable?: ICommand<CursorEventComponent, void>,
        onTranslate?: ICommand<CursorEventComponent, void>,
   }) {
        super({ onEnable, onDisable, onTranslate });
    }

}
