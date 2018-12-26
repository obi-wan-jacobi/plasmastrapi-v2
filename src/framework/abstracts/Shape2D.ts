import IPosition2D from '../interfaces/IPosition2D';
import IShape from '../interfaces/IShape';

export default abstract class Shape2D implements IShape {

    private __vertices: IPosition2D[];

    constructor(vertices: IPosition2D[]) {
        this.__vertices = vertices;
    }

    public get vertices(): IPosition2D[] {
        return this.__vertices;
    }

}

export class MinMaxBounds {

    public minX: number;
    public maxX: number;
    public minY: number;
    public maxY: number;

    constructor({ minX, maxX, minY, maxY }: { minX: number, maxX: number, minY: number, maxY: number}) {
        Object.assign(this, arguments);
    }

}
