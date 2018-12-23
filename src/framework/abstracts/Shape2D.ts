import IPosition2D from '../interfaces/IPosition2D';
import IShape from '../interfaces/IShape';

export default abstract class Shape2D<TColorType> implements IShape<TColorType> {

    public colour: TColorType;

    private __vertices: IPosition2D[];

    constructor({ vertices, colour }: { vertices: IPosition2D[], colour: TColorType }) {
        this.__vertices = vertices;
        this.colour = colour;
    }

    public get vertices(): IPosition2D[] {
        return this.__vertices;
    }

}
