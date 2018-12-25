import Component from '../../abstracts/Component';
import IPosition2D from '../../interfaces/IPosition2D';
import { Optional } from '../../types/Optional';

export default class TranslatableComponent
extends Component<{
    cursor: {
        current: IPosition2D,
        previous: Optional<IPosition2D>
    },
    current: IPosition2D,
    previous: Optional<IPosition2D>
}> {

}
