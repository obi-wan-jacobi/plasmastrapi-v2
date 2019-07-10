import IViewportAdaptor from '../engine/interfaces/IViewportAdaptor';
import { IImageRenderingProfile, ILabel, IPoint, IPose, IShape, IShapeRenderingProfile } from '../engine/components';

function Atomic(target: HTML5CanvasViewportAdaptor, key: string, descriptor: PropertyDescriptor): void {
    const fn = descriptor.value;
    descriptor.value = function(): void {
        this.ctx.save();
        fn.call(this, ...arguments);
        this.ctx.restore();
    };
}

export class HTML5CanvasViewportAdaptor implements IViewportAdaptor {

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
            if (!target.payload.rendering) {
                target.payload.rendering = { zIndex: 0 };
                return target;
            }
            if (!target.payload.rendering.zIndex) {
                target.payload.rendering.zIndex = 0;
                return target;
            }
            return target;
        });
        const zOrdered = zBuffer.sort((a, b) => a.payload.rendering.zIndex - b.payload.rendering.zIndex);
        zOrdered.forEach((target) => {
            this[`__${target.method}`](target.payload);
        });
        this.__zBuffer = [];
    }

    public drawImage({ pose, rendering }: { pose: IPose, rendering: IImageRenderingProfile }): void {
        this.__zBuffer.push({ method: 'drawImage', payload: arguments[0] });
    }

    public drawShape({ shape, rendering }: { shape: IShape, rendering: IShapeRenderingProfile }): void {
        this.__zBuffer.push({ method: 'drawShape', payload: arguments[0] });
    }

    public drawLine({ points, rendering }: { points: IPoint[], rendering: IShapeRenderingProfile }): void {
        this.__zBuffer.push({ method: 'drawLine', payload: arguments[0] });
    }

    public drawLabel({ pose, label }: { pose: IPose, label: ILabel }): void {
        this.__zBuffer.push({ method: 'drawLabel', payload: arguments[0] });
    }

    public drawCircle({ point, radius, rendering }: {
        point: IPoint, radius: number, rendering: IShapeRenderingProfile,
    }): void {
        this.__zBuffer.push({ method: 'drawCircle', payload: arguments[0] });
    }

    @Atomic
    private __drawImage({ pose, rendering }: { pose: IPose, rendering: IImageRenderingProfile }): void {
        const image = this.load(rendering.src);
        this.ctx.translate(pose.x, pose.y);
        if (rendering.rotate) {
            this.ctx.rotate(rendering.rotate);
        }
        this.ctx.drawImage(
            image,
            -(rendering.width || image.width as number) / 2,
            -(rendering.height || image.height as number) / 2,
            rendering.width || image.width as number,
            rendering.height || image.height as number,
        );
    }

    @Atomic
    private __drawShape({ shape, rendering }: { shape: IShape, rendering: IShapeRenderingProfile }): void {
        if (rendering.opacity) {
            this.ctx.globalAlpha = rendering.opacity;
        }
        this.ctx.strokeStyle = rendering.colour;
        this.ctx.beginPath();
        shape.points.forEach((p: IPoint) => {
            this.ctx.lineTo(p.x, p.y);
        });
        if (rendering.fillStyle) {
            this.ctx.fillStyle = rendering.fillStyle;
            this.ctx.fill();
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

    @Atomic
    private __drawLine({ points, rendering }: { points: IPoint[], rendering: IShapeRenderingProfile }): void {
        this.ctx.strokeStyle = rendering.colour;
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
    private __drawCircle({ point, radius, rendering }: {
        point: IPoint, radius: number, rendering: IShapeRenderingProfile,
    }): void {
        this.ctx.strokeStyle = rendering.colour || 'white';
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

}
