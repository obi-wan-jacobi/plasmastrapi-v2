import { IPoint, IPose } from 'src/framework/geometry/components/PoseComponent';
import { IImage } from 'src/framework/presentation/components/ImageComponent';
import { ILabel } from 'src/framework/presentation/components/LabelComponent';
import { IStyle } from 'src/framework/presentation/components/StyleComponent';

export default interface IViewportAdaptor<TImageSource> {

    load(src: string): TImageSource;

    refresh(): void;

    once(): void;

    drawImage({ pose, image }: { pose: IPose, image: IImage }): void;

    drawLabel({ pose, label }: { pose: IPose, label: ILabel }): void;

    drawShape({ path, styling }: { path: IPoint[], styling: IStyle }): void;

    drawLine({ path, styling }: { path: IPoint[], styling: IStyle }): void;

    drawCircle({ position, radius, styling }: { position: IPoint, radius: number, styling: IStyle }): void;
}
