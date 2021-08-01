import UIEntity from 'ui/abstracts/UIEntity';
import { IImage } from 'bootstrap/presentation/components/ImageComponent';

export default class HorizontalThreadedAxle extends UIEntity {

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super({ pose: { x, y, a: 0 }});
    const images: IImage[] = [
      './threaded-axle-1.png',
      './threaded-axle-2.png',
      './threaded-axle-3.png',
      './threaded-axle-4.png',
      './threaded-axle-5.png',
      './threaded-axle-6.png',
      './threaded-axle-7.png',
      './threaded-axle-8.png',
      './threaded-axle-9.png',
      './threaded-axle-10.png',
    ].map((src) => ({ src, width: 10, height }));
    for (let i = 0, L = width / 10; i < L; i++) {
      this.$appendChild(new UIEntity({
        pose: {
          x: x - width / 2 + i * 10 + 5,
          y: y,
          a: 0,
        },
        animation: {
          images,
          frame: 0,
          duration: 50,
          isPaused: true,
          isReversed: false,
        },
      }));
    }
  }
}
