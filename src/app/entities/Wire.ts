import Entity from '../../engine/Entity';
import { getEuclideanDistanceBetweenPoints } from '../../framework/helpers/geometry';
import { PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { ShapeComponent } from 'src/framework/geometry/components/ShapeComponent';
import { StyleComponent } from 'src/framework/presentation/components/StyleComponent';
import { InputTerminal, OutputTerminal } from './terminals';

export default class Wire extends Entity {

    public input: InputTerminal;
    public output: OutputTerminal;

    constructor({ input, output }: { input: InputTerminal, output: OutputTerminal }) {
        super(arguments[0]);
        this.input = input;
        this.output = output;
        this.$add(StyleComponent)({ colour: 'WHITE' });
        this.updatePose();
        this.updateShape();
    }

    public high(): void {
        this.$mutate(StyleComponent)({ colour: 'GREEN' });
    }

    public low(): void {
        this.$mutate(StyleComponent)({ colour: 'RED' });
    }

    public off(): void {
        this.$mutate(StyleComponent)({ colour: 'WHITE' });
    }

    public updatePose(): void {
        const inPose = this.input.$copy(PoseComponent);
        const outPose = this.output.$copy(PoseComponent);
        const x = (inPose.x + outPose.x) / 2;
        const y = (inPose.y + outPose.y) / 2;
        const a = Math.atan2(inPose.y - outPose.y, inPose.x - outPose.x);
        this.$add(PoseComponent)({ x, y, a });
    }

    public updateShape(): void {
        const inPose = this.input.$copy(PoseComponent);
        const outPose = this.output.$copy(PoseComponent);
        const length = getEuclideanDistanceBetweenPoints(inPose, outPose);
        this.$add(ShapeComponent)({ points: [
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
