import Component from 'src/framework/abstracts/Component';

export default class PoseComponent extends Component<{ x: number, y: number, a: number }> {

    public x: number;
    public y: number;
    public a: number;

    constructor({ x, y, a }: { x: number, y: number, a: number }) {
        super({ x, y, a });
    }

}
