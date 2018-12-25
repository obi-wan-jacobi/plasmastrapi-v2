import IRenderingProfile from './IRenderingProfile';
import IShape from './IShape';

export default interface IRenderContext<TRenderProfile extends IRenderingProfile<any>> {

    refresh(): void;

    drawPoint(point: { x: number, y: number }, renderProfile: TRenderProfile): void;

    drawShape(shape: IShape, renderProfile: TRenderProfile): void;

}
