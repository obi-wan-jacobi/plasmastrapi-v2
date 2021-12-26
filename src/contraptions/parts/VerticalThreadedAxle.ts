import UIEntity from 'ui/abstracts/UIEntity';
import { IImage } from 'foundation/presentation/components/ImageComponent';

export default class VerticalThreadedAxle extends UIEntity {

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
    ].map((src) => ({ src, width: 10, height: width, rotate: -Math.PI / 2 }));
    for (let i = 0, L = height / 10; i < L; i++) {
      this.$appendChild(new UIEntity({
        pose: {
          x,
          y: y - height / 2 + i * 10 + 5,
          a: 0,
        },
        style: {
          colour: 'rgba(0,0,0,0)',
          fill: '',
          opacity: 1,
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
