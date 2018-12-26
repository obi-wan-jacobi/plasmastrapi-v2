import Component from '../../framework/abstracts/Component';
import CursorEventComponent from '../../framework/concretes/components/CursorEventComponent';
import ICommand from '../../framework/interfaces/ICommand';
import { Optional } from '../../framework/types/Optional';

export default class TranslatableComponent
extends Component<{
    previous: {
        cursor: {
            x: number,
            y: number
        },
    },
    onTranslate: Optional<ICommand<CursorEventComponent, void>>
}> {

    constructor({ onTranslate }: { onTranslate?: ICommand<CursorEventComponent, void> }) {
        super({
            previous: {
                cursor: {
                    x: 0,
                    y: 0
                },
            },
            onTranslate
        });
    }

}
