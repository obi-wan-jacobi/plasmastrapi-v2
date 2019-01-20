import CursorEventComponent from '../../../engine/components/CursorEventComponent';
import Entity from '../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import InputTerminal from './InputTerminal';
import LineComponent from '../../components/LineComponent';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../../engine/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/components/RenderingComponent';
import ShapeComponent from '../../../engine/components/ShapeComponent';
import WireCreationCaret from '../tool-carets/WireCreationCaret';

export default class Wire extends Entity {

    constructor({ head, tail }: { head: InputTerminal | WireCreationCaret, tail: OutputTerminal | WireCreationCaret }) {
        super();
        this.add(CursorEventComponent);
        this.add(PoseComponent, { x: - Infinity, y: -Infinity });
        this.add(ShapeComponent, new Rectangle({ width: -Infinity, height: -Infinity }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(LineComponent, { head, tail });
    }

    public get head(): Entity {
        return this.get(LineComponent).data.head;
    }

    public get tail(): Entity {
        return this.get(LineComponent).data.tail;
    }

}
