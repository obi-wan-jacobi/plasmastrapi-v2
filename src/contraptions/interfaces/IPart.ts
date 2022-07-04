import { IPoint } from 'foundation/geometry/components/PoseComponent';

export default interface IPart {

  init(point: IPoint): void;
  reset(): void;

}