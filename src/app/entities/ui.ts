import Entity from '../../engine/Entity';
import { PoseComponent } from 'src/framework/geometry/components/PoseComponent';
import { ShapeComponent } from 'src/framework/geometry/components/ShapeComponent';
import { InteractiveEntity } from 'src/framework/interactive/InteractiveEntity';
import { LabelComponent } from 'src/framework/presentation/components/LabelComponent';
import { StyleComponent } from 'src/framework/presentation/components/StyleComponent';

export abstract class UIElement extends InteractiveEntity {

    public constructor({ x, y, width, height }: { x: number, y: number, width: number, height: number }) {
        super(Object.assign({ a: 0 }, arguments[0]));
        this.$add(ShapeComponent)({ points: [
            { x: width / 2, y: height / 2 },
            { x: -width / 2, y: height / 2 },
            { x: -width / 2, y: -height / 2 },
            { x: width / 2, y: -height / 2 },
        ]});
        this.$add(StyleComponent)({ colour: 'WHITE' });
    }

    public $mouseenter(): void {/**/}
    public $mousemove(): void {/**/}
    public $mouseleave(): void {/**/}
    public $mousedown(): void {/**/}
    public $mouseup(): void {/**/}
    public $click(): void {/**/}
}

export abstract class Button extends UIElement {

    public constructor({ x, y, label }: { x: number, y: number, label: string }) {
        super(Object.assign({ width: 40, height: 40 }, arguments[0]));
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
        this.$patch(StyleComponent)({ opacity: 1 });
    }

    public $disable(): void {
        super.$disable();
        this.$patch(StyleComponent)({ opacity: 0.2 });
    }
}

export class Panel extends UIElement {

}
