import { Void } from 'base/types';
import { Stor } from 'engine/types';
import ISystem from './ISystem';

export default interface ISystemMaster<TPipes> {
  add(SystemCtor: Stor<TPipes>): void;
  remove(SystemCtor: Stor<TPipes>): void;
  forEach(fn: Void<ISystem<TPipes>>): void;
}