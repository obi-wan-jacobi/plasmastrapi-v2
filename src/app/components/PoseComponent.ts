import Component from 'src/framework/abstracts/Component';

export default class PoseComponent extends Component<{ x: number, y: number, a: number }> {

    public x: number;
    public y: number;
    public a: number;

    constructor({ x, y, a }: { x: number, y: number, a: number }) {
        super();
        this.set({ x, y, a });
    }

    public set({ x, y, a }: { x: number, y: number, a: number }): void {
        this.x = x;
        this.y = y;
        this.a = a;
    }

}
