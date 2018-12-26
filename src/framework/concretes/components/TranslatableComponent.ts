import Command from '../commands/Command';
import Component from '../../abstracts/Component';
import CursorEventComponent from './CursorEventComponent';
import ICommand from '../../interfaces/ICommand';

export default class TranslatableComponent
extends Component<{
    previous: {
        cursor: {
            x: number,
            y: number
        },
    },
    onTranslate: ICommand<CursorEventComponent, void>
}> {

    constructor({ onTranslate }: { onTranslate?: ICommand<CursorEventComponent, void> }) {
        super({
            previous: {
                cursor: {
                    x: 0,
                    y: 0
                },
            },
            onTranslate: onTranslate || new Command({ method: (component: CursorEventComponent): void => undefined }),
        });
    }

}
