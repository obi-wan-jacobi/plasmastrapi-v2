import Component from '../../abstracts/Component';

export default class PoseComponent
extends Component<{ x: number, y: number, a?: number }> {

    constructor({ x, y, a }: { x: number, y: number, a?: number }) {
        super({ x, y, a: (a !== undefined) ? a : 0});
    }

}
