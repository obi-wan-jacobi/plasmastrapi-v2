import IPosition2D from './IPosition2D';
import IRenderable from './IRenderable';

export default interface IShape extends IRenderable {

    vertices: IPosition2D[];

}
