import IPosition2D from './IPosition2D';

export default interface IRenderContext {

    refresh(): void;

    drawPoint(point: IPosition2D): void;

}
