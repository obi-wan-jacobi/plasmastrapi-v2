import Entity from '../../engine/Entity';
import { LabelComponent, PoseComponent, ShapeComponent, ShapeRenderingProfileComponent } from '../../engine/components';
import { InteractiveElement } from '../../engine/entities';

export class Button extends InteractiveElement {

    public constructor({ x, y, label }: { x: number, y: number, label: string }) {
        super(Object.assign({ width: 40, height: 40 }, arguments[0]));
        this.$add(ShapeRenderingProfileComponent)({ colour: 'WHITE' });
        if (label) {
            this.$add(LabelComponent)({
                fontSize: 10,
                text: label,
                offset: { x: -10, y: 4 },
            });
        }
    }

    public $enable(): void {
        super.$enable();
        this.$patch(ShapeRenderingProfileComponent)({ opacity: 1 });
    }

    public $disable(): void {
        super.$disable();
        this.$patch(ShapeRenderingProfileComponent)({ opacity: 0.2 });
    }
}

export class Panel extends Entity {

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(arguments[0]);
        this.$add(PoseComponent)({ x, y, a: 0 });
        this.$add(ShapeComponent)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
        this.$add(ShapeRenderingProfileComponent)({ colour: 'WHITE' });
    }
}
