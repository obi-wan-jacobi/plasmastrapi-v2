import Entity from '../../framework/concretes/Entity';
import { HTML5_COLOUR } from '../../html5/enums/HTML5_COLOUR';
import InputTerminal from './InputTerminal';
import LineConnectorComponent from '../../framework/concretes/components/LineConnectorComponent';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../framework/concretes/components/PoseComponent';
import Rectangle from '../../framework/concretes/geometry/shapes/Rectangle';
import RenderableShapeComponent from '../../framework/concretes/components/RenderableShapeComponent';
import ShapeComponent from '../../framework/concretes/components/ShapeComponent';
import WireHandle from './WireHandle';

export default class Wire extends Entity {

    constructor({ head, tail }: { head: InputTerminal | WireHandle, tail: OutputTerminal | WireHandle }) {
        super();
        this.add(PoseComponent, { x: - Infinity, y: -Infinity });
        this.add(ShapeComponent, new Rectangle({ width: -Infinity, height: -Infinity }));
        this.add(RenderableShapeComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(LineConnectorComponent, { head, tail });
    }

    public get head(): Entity {
        return this.get(LineConnectorComponent).data.head;
    }

    public get tail(): Entity {
        return this.get(LineConnectorComponent).data.tail;
    }

}
