import { IPoint, IPose } from 'framework/geometry/components/PoseComponent';
import { IImage } from 'framework/presentation/components/ImageComponent';
import { ILabel } from 'framework/presentation/components/LabelComponent';
import { IStyle } from 'framework/presentation/components/StyleComponent';

export default interface IViewportAdaptor<TImageSource> {

    load(src: string): TImageSource;

    refresh(): void;

    once(): void;

    drawImage({ pose, image }: { pose: IPose; image: IImage }): void;

    drawLabel({ pose, label }: { pose: IPose; label: ILabel }): void;

    drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void;

    drawLine({ path, style }: { path: IPoint[]; style: IStyle }): void;

    drawCircle({ position, radius, style }: { position: IPoint; radius: number; style: IStyle }): void;
}
