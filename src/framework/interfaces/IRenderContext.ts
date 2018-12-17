import IPosition2D from './IPosition2D';

export default interface IRenderContext {

    drawPoint(point: IPosition2D): void;

}
