import IViewportAdaptor from '../engine/interfaces/IViewportAdaptor';
import { Index } from 'foundation/types';
import { IPoint, IPose } from 'framework/geometry/components/PoseComponent';
import { IImage } from 'framework/presentation/components/ImageComponent';
import { ILabel } from 'framework/presentation/components/LabelComponent';
import { IStyle } from 'framework/presentation/components/StyleComponent';

function atomic(target: HTML5CanvasViewportAdaptor, key: string, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function(): void {
    this.ctx.save();
    fn.call(this, ...arguments);
    this.ctx.restore();
  };
}

export default class HTML5CanvasViewportAdaptor implements IViewportAdaptor<CanvasImageSource> {

  [key: string]: any;

  public ctx: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  private __imageBuffer: Index<HTMLImageElement> = {};

  private __zBuffer: Array<{ method: string; payload: any }> = [];

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
  }

  public load(src: string): CanvasImageSource {
    if (!this.__imageBuffer[src]) {
      this.__imageBuffer[src] = new Image();
      this.__imageBuffer[src].src = src;
    }
    return this.__imageBuffer[src];
  }

  public refresh(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public once(): void {
    const zBuffer = this.__zBuffer.map((target) => {
      if (!target.payload.style) {
        target.payload.style = { zIndex: 0 };
        return target;
      }
      if (!target.payload.style.zIndex) {
        target.payload.style.zIndex = 0;
        return target;
      }
      return target;
    });
    const zOrdered = zBuffer.sort((a, b) => a.payload.style.zIndex - b.payload.style.zIndex);
    zOrdered.forEach((target) => {
      this[`__${target.method}`](target.payload);
    });
    this.__zBuffer = [];
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public drawImage({ pose, image }: { pose: IPose; image: IImage }): void {
    this.__zBuffer.push({ method: 'drawImage', payload: arguments[0] });
  }

  public drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void {
    this.__zBuffer.push({ method: 'drawShape', payload: arguments[0] });
  }

  public drawLine({ path, style }: { path: IPoint[]; style: IStyle }): void {
    this.__zBuffer.push({ method: 'drawLine', payload: arguments[0] });
  }

  public drawLabel({ pose, label }: { pose: IPose; label: ILabel }): void {
    this.__zBuffer.push({ method: 'drawLabel', payload: arguments[0] });
  }

  public drawCircle({ position, radius, style }: {
    position: IPoint; radius: number; style: IStyle;
  }): void {
    this.__zBuffer.push({ method: 'drawCircle', payload: arguments[0] });
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  @atomic
  private __drawImage({ pose, style }: { pose: IPose; style: IImage }): void {
    const image = this.load(style.src || './favicon.ico');
    this.ctx.translate(pose.x, pose.y);
    this.ctx.rotate(pose.a);
    this.ctx.drawImage(
      image,
      -(style.width || image.width as number) / 2,
      -(style.height || image.height as number) / 2,
      style.width || image.width as number,
      style.height || image.height as number,
    );
  }

  @atomic
  private __drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void {
    if (style.opacity) {
      this.ctx.globalAlpha = style.opacity;
    }
    this.ctx.strokeStyle = style.colour || 'white';
    this.ctx.beginPath();
    path.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    if (style.fill) {
      this.ctx.fillStyle = style.fill;
      this.ctx.fill();
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }

  @atomic
  private __drawLine({ points, style }: { points: IPoint[]; style: IStyle }): void {
    this.ctx.strokeStyle = style.colour || 'white';
    this.ctx.beginPath();
    points.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.stroke();
  }

  @atomic
  private __drawLabel({ pose, label }: { pose: IPose; label: ILabel }): void {
    label.text = label.text || '#{text:NULL}';
    label.offset = label.offset || { x: 0, y: 0 };
    this.ctx.fillStyle = label.colour || 'white';
    this.ctx.font = `${label.fontSize || 10}px Arial`;
    this.ctx.fillText(label.text, pose.x + label.offset.x, pose.y + label.offset.y);
  }

  @atomic
  private __drawCircle({ position, radius, style }: {
    position: IPoint; radius: number; style: IStyle;
  }): void {
    this.ctx.strokeStyle = style.colour || 'white';
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

}
