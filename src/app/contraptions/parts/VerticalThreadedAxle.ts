import AnimatedImageComponent, { IAnimatedImage } from '../../../framework/presentation/components/AnimationComponent';
import IPoseIncrement from '../interfaces/IPoseIncrement';
import MachinePart from './abstracts/MachinePart';

export default class VerticalThreadedAxle extends MachinePart {

  private __threads: MachinePart[] = [];

  public constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    super({ x, y });
    for (let i = 0, L = height / 10; i < L; i++) {
      const thread = this._$master.create(MachinePart, {
        x,
        y: y - height / 2 + i * 10 + 5,
      });
      thread.$add(AnimatedImageComponent)({
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
        ].map((src) => ({ src, width: 10, height: width, rotate: -Math.PI / 2, opacity: 1, zIndex: 0 })),
        frame: 0,
        speed: 1,
        cooldown: 0,
        isPaused: true,
      });
      this.__threads.push(thread);
    }
  }

  public up(): void {
    this.__animate({ isPaused: false, isReversed: true });
  }

  public down(): void {
    this.__animate({ isPaused: false,isReversed: false });
  }

  public off(): void {
    this.__animate({ isPaused: true });
  }

  public step(poseStep: IPoseIncrement): void {
    this.__all(this.step.name, poseStep);
  }

  public reset(): void {
    this.__all(this.reset.name);
  }

  public $destroy(): void {
    this.__all(this.$destroy.name);
  }

  private __animate(settings: IAnimatedImage | {}): void {
    this.__threads.forEach((thread) => thread.$patch(AnimatedImageComponent)(settings));
  }

  private __all(methodName: string, arg?: any): void {
    (MachinePart.prototype as any)[methodName].call(this, arg);
    this.__threads.forEach((thread) => (thread as any)[methodName](arg));
  }
}
