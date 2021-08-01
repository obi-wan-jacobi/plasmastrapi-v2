import IViewport from '../engine/interfaces/IViewport';
import { IPoint, IPose } from 'framework/geometry/components/PoseComponent';
import HTML5ImageCache from './memory/HTML5ImageCache';
import { IImage } from 'framework/presentation/components/ImageComponent';
import { IStyle } from 'framework/presentation/components/StyleComponent';
import { ILabel } from 'framework/presentation/components/LabelComponent';
import { Void } from 'foundation/types';

function Atomic({}, {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function(): void {
    this.ctx.save();
    fn.apply(this, arguments);
    this.ctx.restore();
  };
}

export default class HTML5CanvasViewportAdaptor implements IViewport<CanvasImageSource> {

  public ctx: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  private __imageBuffer = new HTML5ImageCache();

  private __zBuffer: Array<{ method: Void<any>; payload: any }> = [];

  public constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
  }

  public load(src: string): CanvasImageSource {
    return this.__imageBuffer.load(src);
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const zOrdered = this.__zBuffer.sort((a, b) => a.payload.zIndex - b.payload.zIndex);
    zOrdered.forEach((target) => target.method.apply(this, [target.payload]));
    this.__zBuffer = [];
  }

  public drawImage({}: { pose: IPose; image: IImage }): void {
    this.__zBuffer.push({ method: this.__drawImage, payload: arguments[0] });
  }

  public drawShape({}: { path: IPoint[]; style: IStyle }): void {
    this.__zBuffer.push({ method: this.__drawShape, payload: arguments[0] });
  }

  public drawLine({}: { path: IPoint[]; style: IStyle }): void {
    this.__zBuffer.push({ method: this.__drawLine, payload: arguments[0] });
  }

  public drawLabel({}: { pose: IPose; style: IStyle; label: ILabel }): void {
    this.__zBuffer.push({ method: this.__drawLabel, payload: arguments[0] });
  }

  public drawCircle({}: { position: IPoint; radius: number; style: IStyle }): void {
    this.__zBuffer.push({ method: this.__drawCircle, payload: arguments[0] });
  }

  @Atomic
  private __drawImage({ pose, image }: { pose: IPose; image: IImage }): void {
    const asset = this.load(image.src || './favicon.ico');
    this.ctx.translate(pose.x, pose.y);
    this.ctx.rotate(image.rotate || 0);
    this.ctx.drawImage(
      asset,
      -(image.width || asset.width as number) / 2,
      -(image.height || asset.height as number) / 2,
      image.width || asset.width as number,
      image.height || asset.height as number,
    );
  }

  @Atomic
  private __drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void {
    this.ctx.globalAlpha = style.opacity;
    this.ctx.strokeStyle = style.colour;
    this.ctx.beginPath();
    path.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.fillStyle = style.fill;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
  }

  @Atomic
  private __drawLine({ points, style }: { points: IPoint[]; style: IStyle }): void {
    this.ctx.strokeStyle = style.colour;
    this.ctx.beginPath();
    points.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.stroke();
  }

  @Atomic
  private __drawLabel({ pose, style, label }: { pose: IPose; style: IStyle; label: ILabel }): void {
    this.ctx.fillStyle = style.colour;
    this.ctx.font = `${label.fontSize}px Arial`;
    this.ctx.fillText(label.text, pose.x + label.offset.x, pose.y + label.offset.y);
  }

  @Atomic
  private __drawCircle({ position, radius, style }: {
    position: IPoint; radius: number; style: IStyle;
  }): void {
    this.ctx.strokeStyle = style.colour;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

}
