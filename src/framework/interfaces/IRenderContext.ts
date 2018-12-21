import IRenderable from './IRenderable';
import IShape from './IShape';

export default interface IRenderContext {

    refresh(): void;

    drawPoint(point: { x: number, y: number } & IRenderable<any>): void;

    drawShape(shape: IShape<any>): void;

}
