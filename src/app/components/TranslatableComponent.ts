import Component from '../../framework/abstracts/Component';
import IPosition2D from '../../framework/interfaces/IPosition2D';
import { Optional } from '../../framework/types/Optional';

export default class TranslatableComponent
extends Component<{
    previous: {
        x: Optional<number>,
        y: Optional<number>
    }
}> {

    constructor() {
        super({
            previous: {
                x: undefined,
                y: undefined
            }
        });
    }

}
