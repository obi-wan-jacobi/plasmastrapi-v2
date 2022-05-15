import { Void } from 'base/types';
import IComponent from 'engine/interfaces/IComponent';
import { Ctor } from 'engine/types';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import AnimationComponent from 'foundation/presentation/components/AnimationComponent';
import { IImage } from 'foundation/presentation/components/ImageComponent';
import HTML5CanvasElement from 'html5-canvas/HTML5CanvasElement';

export default class VerticalThreadedAxle extends HTML5CanvasElement {

  private __segments: HTML5CanvasElement[] = [];

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super();
    this.$add(PoseComponent)({ x, y, a: 0 });
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
    ].map((src) => ({ src, width: 10, height: width, rotate: -Math.PI / 2, zIndex: 2 }));
    for (let i = 0, L = height / 10; i < L; i++) {
      const segment = this.$appendChild(new HTML5CanvasElement());
      segment.$add(PoseComponent)({
        x,
        y: y - height / 2 + i * 10 + 5,
        a: 0,
      });
      segment.$add(AnimationComponent)({
        images,
        frame: 0,
        duration: 50,
        isPaused: true,
        isReversed: false,
      });
      this.__segments.push(segment);
    }
  }

  public $patch<T extends IComponent<any>>(ComponentClass: Ctor<T, any>): Void<any> {
    const fn = super.$patch(ComponentClass);
    if (ComponentClass.name === AnimationComponent.name) {
      return (data: any) => {
        fn(data);
        this.__segments.forEach((segment) => segment.$patch(AnimationComponent)(data));
      };
    }
    return fn;
  }
}
