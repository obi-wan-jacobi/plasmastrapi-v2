import IPosition2D from '../interfaces/IPosition2D';
import IShape2D from '../interfaces/IShape2D';

export default abstract class Shape2D implements IShape2D {

    private __vertices: IPosition2D[];

    constructor(vertices: IPosition2D[]) {
        this.__vertices = vertices;
    }

    public get vertices(): IPosition2D[] {
        return this.__vertices;
    }

}
