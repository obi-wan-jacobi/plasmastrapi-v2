import IViewportAdaptor from '../engine/interfaces/IViewportAdaptor';
import { IPoint, IPose } from 'src/framework/geometry/components/PoseComponent';
import { IImage } from 'src/framework/presentation/components/ImageComponent';
import { ILabel } from 'src/framework/presentation/components/LabelComponent';
import { IStyle } from 'src/framework/presentation/components/StyleComponent';

function Atomic(target: HTML5CanvasViewportAdaptor, key: string, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function (): void {
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

  private __imageBuffer: { [key: string]: HTMLImageElement } = {};

  private __zBuffer: Array<{ method: string, payload: any }> = [];

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
      if (!target.payload.styling) {
        target.payload.styling = { zIndex: 0 };
        return target;
      }
      if (!target.payload.styling.zIndex) {
        target.payload.styling.zIndex = 0;
        return target;
      }
      return target;
    });
    const zOrdered = zBuffer.sort((a, b) => a.payload.styling.zIndex - b.payload.styling.zIndex);
    zOrdered.forEach((target) => {
      this[`__${target.method}`](target.payload);
    });
    this.__zBuffer = [];
  }

  public drawImage({ pose, image }: { pose: IPose, image: IImage }): void {
    this.__zBuffer.push({ method: 'drawImage', payload: arguments[0] });
  }

  public drawShape({ path, styling }: { path: IPoint[], styling: IStyle }): void {
    this.__zBuffer.push({ method: 'drawShape', payload: arguments[0] });
  }

  public drawLine({ path, styling }: { path: IPoint[], styling: IStyle }): void {
    this.__zBuffer.push({ method: 'drawLine', payload: arguments[0] });
  }

  public drawLabel({ pose, label }: { pose: IPose, label: ILabel }): void {
    this.__zBuffer.push({ method: 'drawLabel', payload: arguments[0] });
  }

  public drawCircle({ position, radius, styling }: {
    position: IPoint, radius: number, styling: IStyle,
  }): void {
    this.__zBuffer.push({ method: 'drawCircle', payload: arguments[0] });
  }

  @Atomic
  private __drawImage({ pose, styling }: { pose: IPose, styling: IImage }): void {
    const image = this.load(styling.src);
    this.ctx.translate(pose.x, pose.y);
    this.ctx.rotate(pose.a);
    this.ctx.drawImage(
      image,
      -(styling.width || image.width as number) / 2,
      -(styling.height || image.height as number) / 2,
      styling.width || image.width as number,
      styling.height || image.height as number,
    );
  }

  @Atomic
  private __drawShape({ path, styling }: { path: IPoint[], styling: IStyle }): void {
    if (styling.opacity) {
      this.ctx.globalAlpha = styling.opacity;
    }
    this.ctx.strokeStyle = styling.colour || 'white';
    this.ctx.beginPath();
    path.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    if (styling.fill) {
      this.ctx.fillStyle = styling.fill;
      this.ctx.fill();
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }

  @Atomic
  private __drawLine({ points, styling }: { points: IPoint[], styling: IStyle }): void {
    this.ctx.strokeStyle = styling.colour || 'white';
    this.ctx.beginPath();
    points.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.stroke();
  }

  @Atomic
  private __drawLabel({ pose, label }: { pose: IPose, label: ILabel }): void {
    this.ctx.fillStyle = label.colour || 'white';
    this.ctx.font = `${label.fontSize}px Arial`;
    this.ctx.fillText(label.text, pose.x + label.offset.x, pose.y + label.offset.y);
  }

  @Atomic
  private __drawCircle({ position, radius, styling }: {
    position: IPoint, radius: number, styling: IStyle,
  }): void {
    this.ctx.strokeStyle = styling.colour || 'white';
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

}
