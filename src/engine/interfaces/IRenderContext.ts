import IPosition2D from '../../geometry/interfaces/IPosition2D';
import IRenderingProfile from './IRenderingProfile';
import IShape2D from '../../geometry/interfaces/IShape2D';

export default interface IRenderContext<TRenderProfile extends IRenderingProfile<any>> {

    drawPoint(point: { x: number, y: number }, renderProfile: TRenderProfile): void;

    drawLine(points: IPosition2D[], renderProfile: TRenderProfile): void;

    drawShape(shape: IShape2D, renderProfile: TRenderProfile): void;

}
