import { IImageRenderingProfile, ILabel, IPoint, IPose, IShape, IShapeRenderingProfile } from '../components';

export default interface IViewportAdaptor {

    load(src: string): CanvasImageSource;

    refresh(): void;

    once(): void;

    drawImage({ pose, rendering }: { pose: IPose, rendering: IImageRenderingProfile }): void;

    drawLabel({ pose, label }: { pose: IPose, label: ILabel }): void;

    drawShape({ shape, rendering }: { shape: IShape, rendering: IShapeRenderingProfile }): void;

    drawLine({ points, rendering }: { points: IPoint[], rendering: IShapeRenderingProfile }): void;

    drawCircle({ point, radius, rendering }: {
        point: IPoint, radius: number, rendering: IShapeRenderingProfile,
    }): void;
}
