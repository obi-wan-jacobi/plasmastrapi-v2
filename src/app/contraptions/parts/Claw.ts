import { Contraption } from '../abstracts/Contraption';
import MachinePart from './abstracts/MachinePart';
import { TouchActivator } from './TouchActivator';
import { TouchSensor } from './TouchSensor';
import HorizontalThreadedAxle from './HorizontalThreadedAxle';
import Actuator from './Actuator';
import { StyleComponent } from '../../../framework/presentation/components/StyleComponent';
import { PoseComponent } from '../../../framework/geometry/components/PoseComponent';
import IPoseIncrement from '../interfaces/IPoseIncrement';

export default class Claw extends Contraption {

  private __wrist: MachinePart;
  private __palm: TouchActivator;
  private __leftHub: TouchSensor;
  private __rightHub: MachinePart;
  private __leftThread: HorizontalThreadedAxle;
  private __rightThread: HorizontalThreadedAxle;
  private __leftTooth: TouchActivator;
  private __rightTooth: TouchSensor;
  private __openMotor: Actuator;
  private __closeMotor: Actuator;

  public constructor({ x, y }: { x: number, y: number }) {
    super(arguments[0]);
    this.__wrist = this.$engine.entities.create(MachinePart, {
      x, y: y - 15, shape: {
        points: [
          { x: 10, y: 5 },
          { x: -10, y: 5 },
          { x: -20, y: -5 },
          { x: 20, y: -5 },
        ]
      },
    });
    this.__palm = this.$engine.entities.create(TouchActivator, {
      x, y: y + 10, shape: {
        points: [
          { x: 10, y: 10 },
          { x: -10, y: 10 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ]
      },
    });
    this.__leftHub = this.$engine.entities.create(TouchSensor, {
      x: x - 52, y: y + 10, shape: {
        points: [
          { x: 2, y: 10 },
          { x: -2, y: 10 },
          { x: -2, y: -10 },
          { x: 2, y: -10 },
        ]
      },
      label: 'open-sensor',
    });
    this.__rightHub = this.$engine.entities.create(MachinePart, {
      x: x + 52, y: y + 10, shape: {
        points: [
          { x: 2, y: 10 },
          { x: -2, y: 10 },
          { x: -2, y: -10 },
          { x: 2, y: -10 },
        ]
      },
    });
    this.__leftThread = this.$engine.entities.create(HorizontalThreadedAxle, {
      x: x - 30, y: y + 10, width: 40, height: 20,
    });
    this.__rightThread = this.$engine.entities.create(HorizontalThreadedAxle, {
      x: x + 30, y: y + 10, width: 40, height: 20,
    });
    this.__leftTooth = this.$engine.entities.create(TouchActivator, {
      x: x - 40, y: y + 10, shape: {
        points: [
          { x: 10, y: 60 },
          { x: -0, y: 60 },
          { x: -0, y: 20 },
          { x: -10, y: 20 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ]
      },
    });
    this.__leftTooth.$patch(StyleComponent)({ zIndex: 1 });
    this.__rightTooth = this.$engine.entities.create(TouchSensor, {
      x: x + 40, y: y + 10, shape: {
        points: [
          { x: 0, y: 20 },
          { x: 0, y: 60 },
          { x: -10, y: 60 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
          { x: 10, y: 20 },
        ]
      },
      label: 'closed-sensor',
    });
    this.__rightTooth.$patch(StyleComponent)({ zIndex: 1 });
    this.__openMotor = this.$engine.entities.create(Actuator, {
      label: 'open',
    });
    this.__closeMotor = this.$engine.entities.create(Actuator, {
      label: 'close',
    });
    this.inputs = [this.__openMotor, this.__closeMotor];
    this.outputs = [this.__leftHub.output, this.__rightTooth.output];
  }

  public once(): void {
    if (this.__rightTooth.isHigh && this.__closeMotor.isHigh) {
      return this.off();
    }
    if (this.__leftHub.isHigh && this.__openMotor.isHigh) {
      return this.off();
    }
    if (this.__openMotor.isHigh && this.__closeMotor.isHigh) {
      return this.off();
    }
    if (this.__closeMotor.isHigh) {
      this.__leftThread.right();
      this.__rightThread.left();
      const leftToothPose = this.__leftTooth.$copy(PoseComponent);
      const rightToothPose = this.__rightTooth.$copy(PoseComponent);
      this.__leftTooth.$patch(PoseComponent)({
        x: leftToothPose.x + 1,
      });
      this.__rightTooth.$patch(PoseComponent)({
        x: rightToothPose.x - 1,
      });
    }
    if (this.__openMotor.isHigh) {
      this.__leftThread.left();
      this.__rightThread.right();
      const leftToothPose = this.__leftTooth.$copy(PoseComponent);
      const rightToothPose = this.__rightTooth.$copy(PoseComponent);
      this.__leftTooth.$patch(PoseComponent)({
        x: leftToothPose.x - 1,
      });
      this.__rightTooth.$patch(PoseComponent)({
        x: rightToothPose.x + 1,
      });
    }
  }

  public off(): void {
    this.__leftThread.off();
    this.__rightThread.off();
  }

  public reset(): void {
    this.__wrist.reset();
    this.__palm.reset();
    this.__leftHub.reset();
    this.__rightHub.reset();
    this.__leftThread.reset();
    this.__rightThread.reset();
    this.__leftTooth.reset();
    this.__leftTooth.reset();
    this.__rightTooth.reset();
  }

  public step(poseStep: IPoseIncrement): void {
    this.__wrist.step(poseStep);
    this.__palm.step(poseStep);
    this.__leftHub.step(poseStep);
    this.__rightHub.step(poseStep);
    this.__leftThread.step(poseStep);
    this.__rightThread.step(poseStep);
    this.__leftTooth.step(poseStep);
    this.__rightTooth.step(poseStep);
  }

  public $destroy(): void {
    super.$destroy();
    this.__wrist.$destroy();
    this.__palm.$destroy();
    this.__leftHub.$destroy();
    this.__rightHub.$destroy();
    this.__leftThread.$destroy();
    this.__rightThread.$destroy();
    this.__leftTooth.$destroy();
    this.__rightTooth.$destroy();
    this.__openMotor.$destroy();
    this.__closeMotor.$destroy();
  }
}