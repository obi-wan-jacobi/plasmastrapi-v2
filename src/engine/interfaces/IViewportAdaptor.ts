import { IImageRenderingProfile, ILabel, IPoint, IPose, IShape, IShapeRenderingProfile } from '../components';

export default interface IViewportAdaptor {

    refresh(): void;

    drawImage({ pose, rendering }: { pose: IPose, rendering: IImageRenderingProfile }): void;

    drawLabel({ pose, label }: { pose: IPose, label: ILabel }): void;

    drawShape({ shape, rendering }: { shape: IShape, rendering: IShapeRenderingProfile }): void;

    drawLine({ points, rendering }: { points: IPoint[], rendering: IShapeRenderingProfile }): void;

    drawPoint({ point }: { point: IPoint }): void;

}
