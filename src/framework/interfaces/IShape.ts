import IPosition2D from './IPosition2D';
import IRenderable from './IRenderable';

export default interface IShape<TColorType> extends IRenderable<TColorType> {

    vertices: IPosition2D[];

}
