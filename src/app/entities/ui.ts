import Entity from '../../engine/Entity';
import { Label, Pose, Shape, ShapeRenderingProfile } from '../../engine/components';
import { InteractiveElement } from '../../engine/entities';

export class Button extends InteractiveElement {

    public constructor({ x, y, label }: { x: number, y: number, label: string }) {
        super(Object.assign({ width: 40, height: 40 }, arguments[0]));
        this.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
        if (label) {
            this.$add(Label)({
                fontSize: 10,
                text: label,
                offset: { x: -10, y: 4 },
            });
        }
    }

    public $enable(): void {
        super.$enable();
        const rendering = this.$copy(ShapeRenderingProfile);
        this.$mutate(ShapeRenderingProfile)(
            Object.assign(rendering, { opacity: 1 }),
        );
    }

    public $disable(): void {
        super.$disable();
        const rendering = this.$copy(ShapeRenderingProfile);
        this.$mutate(ShapeRenderingProfile)(
            Object.assign(rendering, { opacity: 0.2 }),
        );
    }
}

export class Panel extends Entity {

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(arguments[0]);
        this.$add(Pose)({ x, y, a: 0 });
        this.$add(Shape)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
        this.$add(ShapeRenderingProfile)({ colour: 'WHITE' });
    }
}
