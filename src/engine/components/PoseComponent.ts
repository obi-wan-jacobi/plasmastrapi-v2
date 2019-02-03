import Component from '../abstracts/Component';
import IPose2D from '../../geometry/interfaces/IPose2D';

export default class PoseComponent
extends Component<{ x: number, y: number, a: number}> {

    constructor({ x, y, a }: IPose2D & { a?: number }) {
        super({
            x: x || 0,
            y: y || 0,
            a: a || 0,
        });
    }

}
