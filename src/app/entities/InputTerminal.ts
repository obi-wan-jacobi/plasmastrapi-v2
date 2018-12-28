import Entity from '../../framework/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import InputTerminalComponent from '../components/InputTerminalComponent';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderableShapeComponent from '../../framework/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';

export default class InputTerminal extends Entity {

    private __parent: Entity;

    constructor(parent: Entity) {
        super();
        this.__parent = parent;
        this.components.add(new PoseComponent({ x: - Infinity, y: -Infinity }));
        this.components.add(new ShapeComponent(new Rectangle({ width: 10, height: 10 })));
        this.components.add(new RenderableShapeComponent({ colour: HTML5_COLOUR.YELLOW }));
        this.components.add(new InputTerminalComponent());
    }

    public get parent(): Entity {
        return this.__parent;
    }

}
