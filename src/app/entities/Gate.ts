import ActuatableComponent from '../../framework/concretes/components/ActuatableComponent';
import Command from '../../framework/concretes/commands/Command';
import Entity from '../../framework/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderableShapeComponent from '../../framework/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';
import TranslatableComponent from '../../framework/concretes/components/TranslatableComponent';

export default class Gate extends Entity {

    constructor({ x, y }: { x: number, y: number }) {
        super();
        this.components.add(new PoseComponent({ x, y }));
        this.components.add(new ShapeComponent(new Rectangle({ width: 50, height: 50 })));
        this.components.add(new RenderableShapeComponent({ colour: HTML5_COLOUR.WHITE }));
        this.components.add(new ActuatableComponent({
            onBegin: new Command({ method: () => {
                this.components.add(new TranslatableComponent({}));
            }}),
            onEnd: new Command({ method: () => {
                this.components.remove(TranslatableComponent);
            }}),
        }));
    }

}
