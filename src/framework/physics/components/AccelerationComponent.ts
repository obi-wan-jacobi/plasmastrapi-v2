import { Component } from 'src/engine/abstracts/Component';

export interface IAcceleration {
    x: number; y: number; w: number;
}
export class AccelerationComponent extends Component<IAcceleration> {}
