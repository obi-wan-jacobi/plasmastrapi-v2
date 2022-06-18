import Part from 'contraptions/abstracts/Part';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import AnimationComponent from 'foundation/presentation/components/AnimationComponent';
import { IImage } from 'foundation/presentation/components/ImageComponent';

export default class HorizontalThreadedAxle extends Part {

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super();
    this.$add(PoseComponent, { x, y, a: 0 });
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
    ].map((src) => ({ src, width: 10, height, zIndex: 2 }));
    for (let i = 0, L = width / 10; i < L; i++) {
      const segment = new Part();
      segment.$add(PoseComponent, {
        x: -width / 2 + i * 10 + 5,
        y: 0,
        a: 0,
      });
      segment.$add(AnimationComponent, {
        images,
        frame: 0,
        duration: 5,
        isPaused: true,
        isReversed: false,
      });
      this.$appendChild(segment);
    }
  }

  public $patch<T extends IComponent<any>>(ComponentClass: Ctor<T, any>, data: T | any): void {
    if (ComponentClass.name === AnimationComponent.name) {
      this.$children.forEach((child) => child.$patch(AnimationComponent, data));
    }
    super.$patch(ComponentClass, data);
  }
}
