import { IPoint, IPose } from 'framework/geometry/components/PoseComponent';
import { IStrictImage, IStrictStyle } from 'framework/presentation/components/StyleComponent';

export default interface IViewport<TImageSource> {

    load(src: string): TImageSource;

    render(): void;

    drawImage({ pose, image, style }: { pose: IPose; image: IStrictImage; style: IStrictStyle }): void;

    drawLabel({ pose, style }: { pose: IPose; style: IStrictStyle }): void;

    drawShape({ path, style }: { path: IPoint[]; style: IStrictStyle }): void;

    drawLine({ path, style }: { path: IPoint[]; style: IStrictStyle }): void;

    drawCircle({ position, radius, style }: { position: IPoint; radius: number; style: IStrictStyle }): void;
}
