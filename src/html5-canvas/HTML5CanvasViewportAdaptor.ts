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

    public ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;

    private __imageBuffer: { [key: string]: HTMLImageElement } = {};

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

    @Atomic
    public drawImage({ pose, rendering }: { pose: IPose, rendering: IImageRenderingProfile }): void {
        const image = this.load(rendering.src);
        const dx = pose.x - (rendering.width || image.width as number) / 2;
        const dy = pose.y - (rendering.height || image.height as number) / 2;
        this.ctx.drawImage(
            image,
            dx,
            dy,
            rendering.width || image.width as number,
            rendering.height || image.height as number,
        );
    }

    @Atomic
    public drawShape({ shape, rendering }: { shape: IShape, rendering: IShapeRenderingProfile }): void {
        if (rendering.opacity) {
            this.ctx.globalAlpha = rendering.opacity;
        }
        this.ctx.strokeStyle = rendering.colour;
        this.ctx.beginPath();
        shape.points.forEach((p: IPoint) => {
            this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.closePath();
        this.ctx.stroke();
    }

    @Atomic
    public drawLine({ points, rendering }: { points: IPoint[], rendering: IShapeRenderingProfile }): void {
        this.ctx.strokeStyle = rendering.colour;
        this.ctx.beginPath();
        points.forEach((p: IPoint) => {
            this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.stroke();
    }

    @Atomic
    public drawLabel({ pose, label }: { pose: IPose, label: ILabel }): void {
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${label.fontSize}px Arial`;
        this.ctx.fillText(label.text, pose.x + label.offset.x, pose.y + label.offset.y);
    }

    @Atomic
    public drawPoint({ point }: { point: IPoint }): void {
        this.ctx.fillStyle = 'magenta';
        this.ctx.fillRect(point.x, point.y, 4, 4);
    }

}
