import IUnique from 'src/data-structures/interfaces/IUnique';

export default interface IDigitalOperator extends IUnique {
  isHigh: boolean;
  isLow: boolean;
  isOff: boolean;
  high(): void;
  low(): void;
  off(): void;
  to(target: IDigitalOperator): void;
  from(target: IDigitalOperator): void;
  detach(target: IDigitalOperator): void;
  compute(): void;
  dispose(): void;
}
