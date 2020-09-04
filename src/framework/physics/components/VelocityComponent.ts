import Component from 'src/engine/abstracts/Component';

export interface IVelocity {
  x: number; y: number; w: number;
}
export default class VelocityComponent extends Component<IVelocity> { }
