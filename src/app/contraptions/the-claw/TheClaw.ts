import Claw from '../parts/Claw';
import HorizontalThreadedAxle from '../parts/HorizontalThreadedAxle';
import VerticalThreadedAxle from '../parts/VerticalThreadedAxle';
import UIEntity from 'app/ui/abstracts/UIEntity';

export default class TheClaw extends UIEntity {

  private __horizontalRail: HorizontalThreadedAxle;
  private __verticalRail: VerticalThreadedAxle;
  private __carriage: UIEntity;

  private __leftMotor: UIEntity;
  private __rightMotor: UIEntity;
  private __topMotor: UIEntity;
  private __bottomMotor: UIEntity;

  private __leftSensor: UIEntity;
  private __rightSensor: UIEntity;
  private __topSensor: UIEntity;
  private __bottomSensor: UIEntity;

  private __claw: Claw;

  private __prize: UIEntity;

  public constructor({ x, y }: { x: number; y: number }) {
    super(arguments[0]);
    this.__horizontalRail = this.$appendChild(new HorizontalThreadedAxle({ x, y, width: 300, height: 20 }));
    this.__carriage = this.$appendChild(new UIEntity({
      pose: { x: x - 130, y, a: 0 },
      shape: {
        vertices: [
          { x: 20, y: 30 },
          { x: -20, y: 30 },
          { x: -20, y: -30 },
          { x: 20, y: -30 },
        ],
      },
      style: { default: { colour: 'WHITE', opacity: 1, fill: 'rgba(0,0,0,0)', zIndex: 1 } },
    }));
    this.__verticalRail = this.$appendChild(new VerticalThreadedAxle({
      x: x - 130, y, width: 20, height: 200,
    }));
    this.__leftSensor = this.$appendChild(new UIEntity({
      pose: { x: x - 170, y, a: 0 },
      shape: {
        vertices: [
          { x: 20, y: 20 },
          { x: -20, y: 20 },
          { x: -20, y: -20 },
          { x: 20, y: -20 },
        ],
      },
      // labelText: 'left-sensor',
    }));
    this.__rightSensor = this.$appendChild(new UIEntity({
      pose: { x: x + 170, y, a: 0 },
      shape: {
        vertices: [
          { x: 20, y: 20 },
          { x: -20, y: 20 },
          { x: -20, y: -20 },
          { x: 20, y: -20 },
        ],
      },
      // labelText: 'right-sensor',
    }));
    this.__topSensor = this.$appendChild(new UIEntity({
      pose: { x: x - 130, y: y - 105, a: 0 },
      shape: {
        vertices: [
          { x: 20, y: 5 },
          { x: -20, y: 5 },
          { x: -20, y: -5 },
          { x: 20, y: -5 },
        ],
      },
      // labelText: 'top-sensor',
    }));
    this.__bottomSensor = this.$appendChild(new UIEntity({
      pose: { x: x - 130, y: y + 105, a: 0 },
      shape: {
        vertices: [
          { x: 20, y: 5 },
          { x: -20, y: 5 },
          { x: -20, y: -5 },
          { x: 20, y: -5 },
        ],
      },
      // labelText: 'bottom-sensor',
    }));
    this.__leftMotor = this.$appendChild(new UIEntity({
      // labelText: 'move-left',
    }));
    this.__rightMotor = this.$appendChild(new UIEntity({
      // labelText: 'move-right',
    }));
    this.__topMotor = this.$appendChild(new UIEntity({
      // labelText: 'move-up',
    }));
    this.__bottomMotor = this.$appendChild(new UIEntity({
      // labelText: 'move-down',
    }));
    this.__claw = this.$appendChild(new Claw({
      x: x - 130, y: y + 130,
    }));
    this.__prize = this.$appendChild(new UIEntity({
      pose: { x: x + 130, y: y + 250, a: 0 },
      shape: {
        vertices: [
          { x: 10, y: 20 },
          { x: -10, y: 20 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ],
      },
    }));
    // this.inputs = [
    //   this.__leftMotor,
    //   this.__topMotor,
    //   this.__claw.inputs[0],
    //   this.__rightMotor,
    //   this.__bottomMotor,
    //   this.__claw.inputs[1],
    // ];
    // this.outputs = [
    //   this.__leftSensor.output,
    //   this.__bottomSensor.output,
    //   this.__claw.outputs[1],
    //   this.__rightSensor.output,
    //   this.__topSensor.output,
    //   this.__claw.outputs[0],
    // ];
  }

  // public once(): void {
  //   this.__updateHorizontalState();
  //   this.__updateVerticalState();
  // }

  // private __updateHorizontalState(): void {
  //   if (this.__leftMotor.isHigh && this.__rightMotor.isHigh) {
  //     return this.__offX();
  //   }
  //   if (this.__leftMotor.isLow && this.__rightMotor.isLow) {
  //     return this.__offX();
  //   }
  //   if (this.__leftMotor.isHigh) {
  //     if (this.__leftSensor.isHigh) {
  //       return this.__offX();
  //     }
  //     return this.__left();
  //   }
  //   if (this.__rightMotor.isHigh) {
  //     if (this.__rightSensor.isHigh) {
  //       return this.__offX();
  //     }
  //     return this.__right();
  //   }
  //   return this.__offX();
  // }

  // private __updateVerticalState(): void {
  //   if (this.__topMotor.isHigh && this.__bottomMotor.isHigh) {
  //     return this.__offY();
  //   }
  //   if (this.__topMotor.isLow && this.__bottomMotor.isLow) {
  //     return this.__offY();
  //   }
  //   if (this.__topMotor.isHigh) {
  //     if (this.__bottomSensor.isHigh) {
  //       return this.__offY();
  //     }
  //     return this.__up();
  //   }
  //   if (this.__bottomMotor.isHigh) {
  //     if (this.__topSensor.isHigh) {
  //       return this.__offY();
  //     }
  //     return this.__down();
  //   }
  //   return this.__offY();
  // }

  // private __left(): void {
  //   this.__carriage.translate({ x: -1 });
  //   this.__verticalRail.translate({ x: -1 });
  //   this.__topSensor.translate({ x: -1 });
  //   this.__bottomSensor.translate({ x: -1 });
  //   this.__horizontalRail.left();
  //   this.__claw.step({ x: -1 });
  // }

  // private __right(): void {
  //   this.__carriage.translate({ x: 1 });
  //   this.__verticalRail.translate({ x: 1 });
  //   this.__topSensor.translate({ x: 1 });
  //   this.__bottomSensor.translate({ x: 1 });
  //   this.__horizontalRail.right();
  //   this.__claw.step({ x: 1 });
  // }

  // private __up(): void {
  //   this.__verticalRail.translate({ y: -1 });
  //   this.__topSensor.translate({ y: -1 });
  //   this.__bottomSensor.translate({ y: -1 });
  //   this.__verticalRail.up();
  //   this.__claw.step({ y: -1 });
  // }

  // private __down(): void {
  //   this.__verticalRail.translate({ y: 1 });
  //   this.__topSensor.translate({ y: 1 });
  //   this.__bottomSensor.translate({ y: 1 });
  //   this.__verticalRail.down();
  //   this.__claw.step({ y: 1 });
  // }

  // private __offX(): void {
  //   this.__carriage.translate({ x: 0 });
  //   this.__verticalRail.translate({ x: 0 });
  //   this.__topSensor.translate({ x: 0 });
  //   this.__bottomSensor.translate({ x: 0 });
  //   this.__horizontalRail.off();
  //   this.__claw.step({ x: 0 });
  // }

  // private __offY(): void {
  //   this.__verticalRail.translate({ y: 0 });
  //   this.__topSensor.translate({ y: 0 });
  //   this.__bottomSensor.translate({ y: 0 });
  //   this.__verticalRail.off();
  //   this.__claw.step({ y: 0 });
  // }
}
