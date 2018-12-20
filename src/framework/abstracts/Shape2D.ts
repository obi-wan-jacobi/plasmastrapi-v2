import IPosition2D from '../interfaces/IPosition2D';
import IShape from '../interfaces/IShape';

export default abstract class Shape2D implements IShape {

    public colour: string;

    private __vertices: IPosition2D[];

    constructor(vertices: IPosition2D[]) {
        this.__vertices = vertices;
    }

    public get vertices(): IPosition2D[] {
        return this.__vertices;
    }

}
