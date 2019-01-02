
export class MinMaxBoundary2D {

    public minX: number;
    public maxX: number;
    public minY: number;
    public maxY: number;

    constructor({ minX, maxX, minY, maxY }: { minX: number, maxX: number, minY: number, maxY: number}) {
        Object.assign(this, { minX, maxX, minY, maxY });
    }

}
