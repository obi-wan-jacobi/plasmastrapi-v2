import Entity from '../../engine/Entity';
import { Pose, Shape, ShapeRenderingProfile } from '../../engine/components';
import { getEuclideanDistanceBetweenPoints } from '../../engine/geometry';
import { InputTerminal, OutputTerminal } from './terminals';

export default class Wire extends Entity {

    public input: InputTerminal;
    public output: OutputTerminal;

    constructor({ input, output }: { input: InputTerminal, output: OutputTerminal }) {
        super(arguments[0]);
        this.input = input;
        this.output = output;
        this.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
        this.updatePose();
        this.updateShape();
    }

    public high(): void {
        this.$mutate(ShapeRenderingProfile)({ colour: 'GREEN' });
    }

    public low(): void {
        this.$mutate(ShapeRenderingProfile)({ colour: 'RED' });
    }

    public off(): void {
        this.$mutate(ShapeRenderingProfile)({ colour: 'WHITE' });
    }

    public updatePose(): void {
        const inPose = this.input.$copy(Pose);
        const outPose = this.output.$copy(Pose);
        const x = (inPose.x + outPose.x) / 2;
        const y = (inPose.y + outPose.y) / 2;
        const a = Math.atan2(inPose.y - outPose.y, inPose.x - outPose.x);
        this.$add(Pose)({ x, y, a });
    }

    public updateShape(): void {
        const inPose = this.input.$copy(Pose);
        const outPose = this.output.$copy(Pose);
        const length = getEuclideanDistanceBetweenPoints(inPose, outPose);
        this.$add(Shape)({ points: [
            { x: length / 2, y: 2 },
            { x: - length / 2, y: 2 },
            { x: - length / 2, y: -2 },
            { x: length / 2, y: -2 },
        ]});
    }

    public $destroy(): void {
        super.$destroy();
        this.input.wires.delete(this.id);
        this.output.wires.delete(this.id);
    }
}