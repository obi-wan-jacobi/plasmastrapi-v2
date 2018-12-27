import Component from '../../abstracts/Component';
import IRenderingProfile from '../../interfaces/IRenderingProfile';
import PoseComponent from './PoseComponent';
import ShapeComponent from './ShapeComponent';

export default class RenderableShapeComponent<TProfile extends IRenderingProfile<any>>
extends Component<TProfile> {

}
