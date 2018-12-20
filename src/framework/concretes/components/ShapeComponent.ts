import Component from '../../abstracts/Component';
import IShape from '../../interfaces/IShape';

export default class ShapeComponent extends Component<IShape> {

    constructor(shape: IShape) {
        super(shape);
    }

}
