import IDataPrimitive from '../../engine/interfaces/IDataPrimitive';
import IPosition2D from './IPosition2D';

export default interface IShape2D extends IDataPrimitive {

    vertices: IPosition2D[];

}
