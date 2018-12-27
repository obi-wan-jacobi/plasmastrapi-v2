import Component from '../../abstracts/Component';
import IShape from '../../interfaces/IShape';
import PoseComponent from './PoseComponent';

export default class ShapeComponent extends Component<IShape> {

    constructor(shape: IShape) {
        super(shape);
        this._dependsOn(PoseComponent);
    }

}
