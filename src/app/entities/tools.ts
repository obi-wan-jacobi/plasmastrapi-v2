import Wire from './Wire';
import { BuildArea, GateCreatorButton, GateDestructorButton, WireDestructorButton } from './designer';
import { Logical } from './gates';
import { IPoint, PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { ShapeComponent } from 'src/framework/geometry/components/ShapeComponent';
import { entityContainsPoint, entityTouchesLine } from 'src/framework/helpers/entities';
import { InteractiveEntity } from 'src/framework/interactive/InteractiveEntity';
import { StyleComponent } from 'src/framework/presentation/components/StyleComponent';
import { InputTerminal, OutputTerminal } from './terminals';
import { Ctor } from '../../data-structures/types';

class InteractiveElement extends InteractiveEntity {

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(Object.assign({ a: 0 }, arguments[0]));
        this.$add(ShapeComponent)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
    }
}

export class ToolHandle extends InteractiveElement {

    constructor({ x, y }: { x: number, y: number }) {
        super(Object.assign({ width: 10, height: 10 }, arguments[0]));
    }

    public $mousemove(): void {
        this.$mutate(PoseComponent)({
            x: this.$engine.mouse.x,
            y: this.$engine.mouse.y,
            a: 0,
        });
    }

    public $click(): void {
        this.$engine.entities.forEvery(BuildArea)((area) => {
            if (entityContainsPoint(area, this.$engine.mouse)) {
                this.action();
            }
        });
        this.$destroy();
    }

    public action(): void { return; }
}
