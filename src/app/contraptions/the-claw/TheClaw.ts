import HorizontalThreadedAxle from '../parts/HorizontalThreadedAxle';
import Actuator from '../parts/Actuator';
import Contraption from '../abstracts/Contraption';
import VerticalThreadedAxle from '../parts/VerticalThreadedAxle';
import TouchActivator from '../parts/TouchActivator';
import TouchSensor from '../parts/TouchSensor';
import Claw from '../parts/Claw';
import MachineTarget from '../parts/abstracts/Prize';
import StyleComponent from '../../../framework/presentation/components/StyleComponent';

export default class TheClaw extends Contraption {

  private __horizontalRail: HorizontalThreadedAxle;
  private __verticalRail: VerticalThreadedAxle;
  private __carriage: TouchActivator;

  private __leftMotor: Actuator;
  private __rightMotor: Actuator;
  private __topMotor: Actuator;
  private __bottomMotor: Actuator;

  private __leftSensor: TouchSensor;
  private __rightSensor: TouchSensor;
  private __topSensor: TouchSensor;
  private __bottomSensor: TouchSensor;

  private __claw: Claw;

  private __prize: MachineTarget;

  public constructor({ x, y }: { x: number, y: number }) {
    super(arguments[0]);
    this.__horizontalRail = this.$engine.entities.create(HorizontalThreadedAxle, { x, y, width: 300, height: 20 });
    this.__carriage = this.$engine.entities.create(TouchActivator, {
      x: x - 130, y,
      shape: {
        points: [
          { x: 20, y: 30 },
          { x: -20, y: 30 },
          { x: -20, y: -30 },
          { x: 20, y: -30 },
        ]
      },
    });
    this.__carriage.$add(StyleComponent)({ colour: 'WHITE', fill: 'BLACK', zIndex: 1 });
    this.__verticalRail = this.$engine.entities.create(VerticalThreadedAxle, {
      x: x - 130, y, width: 20, height: 200,
    });
    this.__leftSensor = this.$engine.entities.create(TouchSensor, {
      x: x - 170, y,
      shape: {
        points: [
          { x: 20, y: 20 },
          { x: -20, y: 20 },
          { x: -20, y: -20 },
          { x: 20, y: -20 },
        ]
      },
      label: 'left-sensor',
    });
    this.__leftSensor.$add(RivetComponent)({
      colour: 'WHITE', radius: 3,
    });
    this.__rightSensor = this.$engine.entities.create(TouchSensor, {
      x: x + 170, y,
      shape: {
        points: [
          { x: 20, y: 20 },
          { x: -20, y: 20 },
          { x: -20, y: -20 },
          { x: 20, y: -20 },
        ]
      },
      label: 'right-sensor',
    });
    this.__rightSensor.$add(RivetComponent)({
      colour: 'WHITE', radius: 3,
    });
    this.__topSensor = this.$engine.entities.create(TouchSensor, {
      x: x - 130, y: y - 105,
      shape: {
        points: [
          { x: 20, y: 5 },
          { x: -20, y: 5 },
          { x: -20, y: -5 },
          { x: 20, y: -5 },
        ]
      },
      label: 'top-sensor',
    });
    this.__bottomSensor = this.$engine.entities.create(TouchSensor, {
      x: x - 130, y: y + 105,
      shape: {
        points: [
          { x: 20, y: 5 },
          { x: -20, y: 5 },
          { x: -20, y: -5 },
          { x: 20, y: -5 },
        ]
      },
      label: 'bottom-sensor',
    });
    this.__leftMotor = this.$engine.entities.create(Actuator, {
      label: 'move-left',
    });
    this.__rightMotor = this.$engine.entities.create(Actuator, {
      label: 'move-right',
    });
    this.__topMotor = this.$engine.entities.create(Actuator, {
      label: 'move-up',
    });
    this.__bottomMotor = this.$engine.entities.create(Actuator, {
      label: 'move-down',
    });
    this.__claw = this.$engine.entities.create(Claw, {
      x: x - 130, y: y + 130,
    });
    this.__prize = this.$engine.entities.create(MachineTarget, {
      x: x + 130,
      y: y + 250,
      shape: {
        points: [
          { x: 10, y: 20 },
          { x: -10, y: 20 },
          { x: -10, y: -20 },
          { x: 10, y: -20 },
        ]
      },
    });
    this.inputs = [
      this.__leftMotor,
      this.__topMotor,
      this.__claw.inputs[0],
      this.__rightMotor,
      this.__bottomMotor,
      this.__claw.inputs[1],
    ];
    this.outputs = [
      this.__leftSensor.output,
      this.__bottomSensor.output,
      this.__claw.outputs[1],
      this.__rightSensor.output,
      this.__topSensor.output,
      this.__claw.outputs[0],
    ];
  }

  public once(): void {
    this.__updateHorizontalState();
    this.__updateVerticalState();
  }

  public off(): void {
    this.__offX();
    this.__offY();
  }

  public reset(): void {
    this.__horizontalRail.reset();
    this.__carriage.reset();
    this.__verticalRail.reset();
    this.__leftSensor.reset();
    this.__rightSensor.reset();
    this.__topSensor.reset();
    this.__bottomSensor.reset();
    this.__claw.reset();
  }

  public $destroy(): void {
    super.$destroy();
    this.__horizontalRail.$destroy();
    this.__verticalRail.$destroy();
    this.__carriage.$destroy();
    this.__leftMotor.$destroy();
    this.__rightMotor.$destroy();
    this.__topMotor.$destroy();
    this.__bottomMotor.$destroy();
    this.__leftSensor.$destroy();
    this.__rightSensor.$destroy();
    this.__topSensor.$destroy();
    this.__bottomSensor.$destroy();
    this.__claw.$destroy();
    this.__prize.$destroy();
  }

  private __updateHorizontalState(): void {
    if (this.__leftMotor.isHigh && this.__rightMotor.isHigh) {
      return this.__offX();
    }
    if (this.__leftMotor.isLow && this.__rightMotor.isLow) {
      return this.__offX();
    }
    if (this.__leftMotor.isHigh) {
      if (this.__leftSensor.isHigh) {
        return this.__offX();
      }
      return this.__left();
    }
    if (this.__rightMotor.isHigh) {
      if (this.__rightSensor.isHigh) {
        return this.__offX();
      }
      return this.__right();
    }
    return this.__offX();
  }

  private __updateVerticalState(): void {
    if (this.__topMotor.isHigh && this.__bottomMotor.isHigh) {
      return this.__offY();
    }
    if (this.__topMotor.isLow && this.__bottomMotor.isLow) {
      return this.__offY();
    }
    if (this.__topMotor.isHigh) {
      if (this.__bottomSensor.isHigh) {
        return this.__offY();
      }
      return this.__up();
    }
    if (this.__bottomMotor.isHigh) {
      if (this.__topSensor.isHigh) {
        return this.__offY();
      }
      return this.__down();
    }
    return this.__offY();
  }

  private __left(): void {
    this.__carriage.step({ x: -1 });
    this.__verticalRail.step({ x: -1 });
    this.__topSensor.step({ x: -1 });
    this.__bottomSensor.step({ x: -1 });
    this.__horizontalRail.left();
    this.__claw.step({ x: -1 });
  }

  private __right(): void {
    this.__carriage.step({ x: 1 });
    this.__verticalRail.step({ x: 1 });
    this.__topSensor.step({ x: 1 });
    this.__bottomSensor.step({ x: 1 });
    this.__horizontalRail.right();
    this.__claw.step({ x: 1 });
  }

  private __up(): void {
    this.__verticalRail.step({ y: -1 });
    this.__topSensor.step({ y: -1 });
    this.__bottomSensor.step({ y: -1 });
    this.__verticalRail.up();
    this.__claw.step({ y: -1 });
  }

  private __down(): void {
    this.__verticalRail.step({ y: 1 });
    this.__topSensor.step({ y: 1 });
    this.__bottomSensor.step({ y: 1 });
    this.__verticalRail.down();
    this.__claw.step({ y: 1 });
  }

  private __offX(): void {
    this.__carriage.step({ x: 0 });
    this.__verticalRail.step({ x: 0 });
    this.__topSensor.step({ x: 0 });
    this.__bottomSensor.step({ x: 0 });
    this.__horizontalRail.off();
    this.__claw.step({ x: 0 });
  }

  private __offY(): void {
    this.__verticalRail.step({ y: 0 });
    this.__topSensor.step({ y: 0 });
    this.__bottomSensor.step({ y: 0 });
    this.__verticalRail.off();
    this.__claw.step({ y: 0 });
  }
}