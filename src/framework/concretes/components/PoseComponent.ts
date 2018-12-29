import Component from '../../abstracts/Component';

export default class PoseComponent
extends Component<{ x: number, y: number, a?: number }> {

    constructor({ x, y, a }: { x: number, y: number, a?: number }) {
        super({
            x: x || 0,
            y: y || 0,
            a: a || 0,
        });
    }

}
