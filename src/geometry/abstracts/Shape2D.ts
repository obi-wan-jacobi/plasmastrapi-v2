import IDataPrimitive from '../../engine/interfaces/IDataPrimitive';
import IPosition2D from '../interfaces/IPosition2D';
import IShape2D from '../interfaces/IShape2D';

export default abstract class Shape2D implements IShape2D {

    [key: string]: string | number | boolean | IDataPrimitive | IDataPrimitive[];

    public readonly vertices: IPosition2D[];

    constructor(vertices: IPosition2D[]) {
        this.vertices = vertices;
    }

}
