import Component from '../Component';
import IRenderable from '../../interfaces/IRenderable';

export default abstract class RenderableComponent<TData, TColourType> extends Component<TData>
implements IRenderable<TColourType> {

    public colour: TColourType;

}
