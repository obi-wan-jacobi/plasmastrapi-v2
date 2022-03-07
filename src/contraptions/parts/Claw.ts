import HorizontalThreadedAxle from './HorizontalThreadedAxle';
import UIEntity from 'ui/UIEntity';
import MachinePart from './MachinePart';
import MachineInput from './MachineInput';
import MachineOutput from './MachineOutput';

export interface IClawIO {
  inputs: {
    open: MachineInput;
    close: MachineInput;
  };
  outputs: {
    open: MachineOutput;
    closed: MachineOutput;
  };
}

export default class Claw extends UIEntity {

  private __wrist: MachinePart;
  private __palm: UIEntity;
  private __leftHub: UIEntity;
  private __rightHub: UIEntity;
  private __leftThread: HorizontalThreadedAxle;
  private __rightThread: HorizontalThreadedAxle;
  private __leftTooth: UIEntity;
  private __rightTooth: UIEntity;
  private __openMotor: UIEntity;
  private __closeMotor: UIEntity;

  public constructor({ x, y, io }: { x: number; y: number; io: IClawIO }) {
    super(arguments[0]);
    this.__wrist = this.$appendChild(new UIEntity({
      pose: { x, y: y - 15, a: 0 },
      shape: {
        vertices: [
          { x: 10, y: 5 },
          { x: -10, y: 5 },
          { x: -20, y: -5 },
          { x: 20, y: -5 },
        ],
      },
      style: { colour: 'WHITE', opacity: 1, fill: 'rgba(0,0,0,0)', zIndex: 0 },
    }));
    //touchactivator
    this.__palm = this.$appendChild(new UIEntity({
      pose: { x, y: y + 10, a: 0 },
      shape: {
        vertices: [
          { x: 10, y: 10 },
          { x: -10, y: 10 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ],
      },
      style: { colour: 'WHITE', opacity: 1, fill: 'rgba(0,0,0,0)', zIndex: 0 },
    }));
    // touchsensor
    this.__leftHub = this.$appendChild(new UIEntity({
      pose: { x: x - 52, y: y + 10, a: 0 },
      shape: {
        vertices: [
          { x: 2, y: 10 },
          { x: -2, y: 10 },
          { x: -2, y: -10 },
          { x: 2, y: -10 },
        ],
      },
      style: { colour: 'WHITE', opacity: 1, fill: 'rgba(0,0,0,0)', zIndex: 0 },
      // labelText: 'open-sensor',
    }));
    this.__rightHub = this.$appendChild(new UIEntity({
      pose: { x: x + 52, y: y + 10, a: 0 },
      shape: {
        vertices: [
          { x: 2, y: 10 },
          { x: -2, y: 10 },
          { x: -2, y: -10 },
          { x: 2, y: -10 },
        ],
      },
      style: { colour: 'WHITE', opacity: 1, fill: 'rgba(0,0,0,0)', zIndex: 0 },
    }));
    this.__leftThread = this.$appendChild(new HorizontalThreadedAxle({
      x: x - 30, y: y + 10, width: 40, height: 20,
    }));
    this.__rightThread = this.$appendChild(new HorizontalThreadedAxle({
      x: x + 30, y: y + 10, width: 40, height: 20,
    }));
    // touchactivator
    this.__leftTooth = this.$appendChild(new UIEntity({
      pose: { x: x - 40, y: y + 10, a: 0 },
      shape: {
        vertices: [
          { x: 10, y: 60 },
          { x: -0, y: 60 },
          { x: -0, y: 20 },
          { x: -10, y: 20 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ],
      },
      style: { colour: 'WHITE', opacity: 1, fill: 'BLACK', zIndex: 1 },
    }));
    // touchsensor
    this.__rightTooth = this.$appendChild(new UIEntity({
      pose: { x: x + 40, y: y + 10, a: 0 },
      shape: {
        vertices: [
          { x: 0, y: 20 },
          { x: 0, y: 60 },
          { x: -10, y: 60 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
          { x: 10, y: 20 },
        ],
      },
      style: { colour: 'WHITE', opacity: 1, fill: 'BLACK', zIndex: 1 },
      // labelText: 'closed-sensor',
    }));
    this.__openMotor = this.$appendChild(new UIEntity({
      // labelText: 'open',
    }));
    this.__closeMotor = this.$appendChild(new UIEntity({
      // labelText: 'close',
    }));
    // this.inputs = [this.__openMotor, this.__closeMotor];
    // this.outputs = [this.__leftHub.output, this.__rightTooth.output];
  }

  // public once(): void {
  //   if (this.__rightTooth.isHigh && this.__closeMotor.isHigh) {
  //     return this.off();
  //   }
  //   if (this.__leftHub.isHigh && this.__openMotor.isHigh) {
  //     return this.off();
  //   }
  //   if (this.__openMotor.isHigh && this.__closeMotor.isHigh) {
  //     return this.off();
  //   }
  //   if (this.__closeMotor.isHigh) {
  //     this.__leftThread.right();
  //     this.__rightThread.left();
  //     const leftToothPose = this.__leftTooth.$copy(PoseComponent);
  //     const rightToothPose = this.__rightTooth.$copy(PoseComponent);
  //     this.__leftTooth.$patch(PoseComponent)({
  //       x: leftToothPose.x + 1,
  //     });
  //     this.__rightTooth.$patch(PoseComponent)({
  //       x: rightToothPose.x - 1,
  //     });
  //   }
  //   if (this.__openMotor.isHigh) {
  //     this.__leftThread.left();
  //     this.__rightThread.right();
  //     const leftToothPose = this.__leftTooth.$copy(PoseComponent);
  //     const rightToothPose = this.__rightTooth.$copy(PoseComponent);
  //     this.__leftTooth.$patch(PoseComponent)({
  //       x: leftToothPose.x - 1,
  //     });
  //     this.__rightTooth.$patch(PoseComponent)({
  //       x: rightToothPose.x + 1,
  //     });
  //   }
  // }
}
