import Actuator from './Actuator';
import Contraption from '../abstracts/Contraption';
import HorizontalThreadedAxle from './HorizontalThreadedAxle';
import IPoseIncrement from '../interfaces/IPoseIncrement';
import MachinePart from './abstracts/MachinePart';
import PoseComponent from '../../../framework/geometry/components/PoseComponent';
import StyleComponent from '../../../framework/presentation/components/StyleComponent';
import TouchActivator from './TouchActivator';
import TouchSensor from './TouchSensor';
import IEntityTemplate from 'app/IEntityTemplate';

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

  public constructor({ pose }: IEntityTemplate) {
    super(arguments[0]);
    this.__wrist = this._$master.create(MachinePart, {
      pose: { x: pose.x, y: pose.y - 15, a: 0 },
      shape: {
        vertices: [
          { x: 10, y: 5 },
          { x: -10, y: 5 },
          { x: -20, y: -5 },
          { x: 20, y: -5 },
        ],
      },
    });
    this.__palm = this._$master.create(TouchActivator, {
      pose: { x: pose.x, y: pose.y + 10, a: 0 },
      shape: {
        vertices: [
          { x: 10, y: 10 },
          { x: -10, y: 10 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ],
      },
    });
    this.__leftHub = this._$master.create(TouchSensor, {
      pose: { x: pose.x - 52, y: pose.y + 10, a: 0 },
      shape: {
        vertices: [
          { x: 2, y: 10 },
          { x: -2, y: 10 },
          { x: -2, y: -10 },
          { x: 2, y: -10 },
        ],
      },
      label: 'open-sensor',
    });
    this.__rightHub = this._$master.create(MachinePart, {
      x: x + 52, y: y + 10, shape: {
        vertices: [
          { x: 2, y: 10 },
          { x: -2, y: 10 },
          { x: -2, y: -10 },
          { x: 2, y: -10 },
        ],
      },
    });
    this.__leftThread = this._$master.create(HorizontalThreadedAxle, {
      x: x - 30, y: y + 10, width: 40, height: 20,
    });
    this.__rightThread = this._$master.create(HorizontalThreadedAxle, {
      x: x + 30, y: y + 10, width: 40, height: 20,
    });
    this.__leftTooth = this._$master.create(TouchActivator, {
      x: x - 40, y: y + 10, shape: {
        vertices: [
          { x: 10, y: 60 },
          { x: -0, y: 60 },
          { x: -0, y: 20 },
          { x: -10, y: 20 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ],
      },
    });
    this.__leftTooth.$patch(StyleComponent)({ zIndex: 1 });
    this.__rightTooth = this._$master.create(TouchSensor, {
      x: x + 40, y: y + 10, shape: {
        vertices: [
          { x: 0, y: 20 },
          { x: 0, y: 60 },
          { x: -10, y: 60 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
          { x: 10, y: 20 },
        ],
      },
      label: 'closed-sensor',
    });
    this.__rightTooth.$patch(StyleComponent)({ zIndex: 1 });
    this.__openMotor = this._$master.create(Actuator, {
      label: 'open',
    });
    this.__closeMotor = this._$master.create(Actuator, {
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
