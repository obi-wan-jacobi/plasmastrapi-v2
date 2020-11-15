import AnimationComponent from '../../../framework/presentation/components/AnimationComponent';
import IPoseIncrement from '../interfaces/IPoseIncrement';
import MachinePart from './abstracts/MachinePart';

export default class VerticalThreadedAxle extends MachinePart {

  private __threads: MachinePart[] = [];

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super(arguments[0]);
    for (let i = 0, L = height / 10; i < L; i++) {
      const thread = this._$master.create(MachinePart, {
        x,
        y: y - height / 2 + i * 10 + 5,
      });
      thread.$add(AnimationComponent)({
        images: [
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
        ].map((src) => ({ src, width: 10, height: width, rotate: -Math.PI / 2 })),
        frame    : 0,
        speed    : 1,
        cooldown : 0,
        isPaused : true,
      });
      this.__threads.push(thread);
    }
  }

  public up(): void {
    this.__threads.forEach((thread) => {
      thread.$patch(AnimationComponent)({
        isPaused   : false,
        isReversed : true,
      });
    });
  }

  public down(): void {
    this.__threads.forEach((thread) => {
      thread.$patch(AnimationComponent)({
        isPaused   : false,
        isReversed : false,
      });
    });
  }

  public off(): void {
    this.__threads.forEach((thread) => {
      thread.$patch(AnimationComponent)({
        isPaused: true,
      });
    });
  }

  public step(poseStep: IPoseIncrement): void {
    super.step(poseStep);
    this.__threads.forEach((thread) => {
      thread.step(poseStep);
    });
  }

  public reset(): void {
    super.reset();
    this.__threads.forEach((thread) => {
      thread.reset();
    });
  }

  public $destroy(): void {
    super.$destroy();
    this.__threads.forEach((thread) => {
      thread.$destroy();
    });
  }
}
