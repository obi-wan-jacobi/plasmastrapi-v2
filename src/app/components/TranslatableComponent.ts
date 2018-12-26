import Component from '../../framework/abstracts/Component';
import IPosition2D from '../../framework/interfaces/IPosition2D';
import { Optional } from '../../framework/types/Optional';

export default class TranslatableComponent
extends Component<{
    previous: {
        cursor: {
            x: number,
            y: number
        },
    }
}> {

    constructor() {
        super({
            previous: {
                cursor: {
                    x: 0,
                    y: 0
                },
            }
        });
    }

}
