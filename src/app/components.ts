import { Component } from '../engine/Component';

export interface IRivetRenderingProfile {
    colour: string;
    radius: number;
    zIndex?: number;
}
export class RivetComponent extends Component<IRivetRenderingProfile> {}