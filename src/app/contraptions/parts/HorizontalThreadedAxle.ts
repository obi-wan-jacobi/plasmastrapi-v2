import IPoseIncrement from '../interfaces/IPoseIncrement';
import MachinePart from './abstracts/MachinePart';
import { IPose } from 'framework/geometry/components/PoseComponent';
import AnimationComponent from 'framework/presentation/components/AnimationComponent';

export default class HorizontalThreadedAxle extends MachinePart {

  private __threads: MachinePart[] = [];

  public constructor({ pose, width, height }: { pose: IPose; width: number; height: number }) {
    super(arguments[0]);
    for (let i = 0, L = width / 10; i < L; i++) {
      const thread = this._$master.create(MachinePart, {
        pose: {
          x : pose.x - width / 2 + i * 10 + 5,
          y : pose.y,
          a : pose.a,
        },
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
        ].map((src) => ({ src, width: 10, height })),
        frame    : 0,
        speed    : 1,
        cooldown : 0,
        isPaused : true,
      });
      this.__threads.push(thread);
    }
  }

  public left(): void {
    this.__threads.forEach((thread) => {
      thread.$patch(AnimationComponent)({
        isPaused   : false,
        isReversed : false,
      });
    });
  }

  public right(): void {
    this.__threads.forEach((thread) => {
      thread.$patch(AnimationComponent)({
        isPaused   : false,
        isReversed : true,
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
