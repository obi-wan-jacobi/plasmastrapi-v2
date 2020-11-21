import { IShape } from 'framework/geometry/components/ShapeComponent';
import MachinePart from './MachinePart';

export default class MachineTarget extends MachinePart {

  public constructor({}: { x: number; y: number; shape: IShape }) {
    super(arguments[0]);
  }
}
