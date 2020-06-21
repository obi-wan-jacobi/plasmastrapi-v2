import { PoseComponent } from '../geometry/components/PoseComponent';
import { entityContainsPoint } from '../helpers/entities';
import Entity from 'src/engine/Entity';

export abstract class InteractiveEntity extends Entity {

    [key: string]: any;

    private __isDisabled: boolean = false;
    private __isHovered: boolean = false;

    public constructor({ x, y, a }: { x: number, y: number, a: number }) {
        super(arguments[0]);
        this.$add(PoseComponent)({ x, y, a });
    }

    public $enable(): void {
        this.__isDisabled = false;
    }

    public $disable(): void {
        this.__isDisabled = true;
    }

    public $once(): void {
        if (this.__isDisabled) {
            return;
        }
        if (this.$engine.mouse.name === 'none') {
            return;
        }
        if (!entityContainsPoint(this, this.$engine.mouse)) {
            if (this.$engine.mouse.name === 'mousemove') {
                this.$mousemove();
            }
            if (this.__isHovered) {
                this.__isHovered = false;
                this.$mouseleave();
            }
            return;
        }
        if (!this.__isHovered) {
            this.__isHovered = true;
            this.$mouseenter();
        }
        this[`$${this.$engine.mouse.name}`]();
    }

    public abstract $mouseenter(): void;
    public abstract $mouseleave(): void;
    public abstract $mousemove(): void;
    public abstract $mousedown(): void;
    public abstract $mouseup(): void;
    public abstract $click(): void;
}
