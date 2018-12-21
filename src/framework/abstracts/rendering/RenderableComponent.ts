import Component from '../Component';
import IRenderable from '../../interfaces/IRenderable';

export default abstract class RenderableComponent<TData extends IRenderable<any>>
extends Component<TData> {

}
