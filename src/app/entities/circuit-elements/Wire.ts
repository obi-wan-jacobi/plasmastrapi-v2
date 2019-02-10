import Entity, { EntityHas } from '../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import IEntity from '../../../engine/interfaces/IEntity';
import InputTerminal from './InputTerminal';
import LineComponent from '../../components/LineComponent';
import MouseEventComponent from '../../../engine/components/MouseEventComponent';
import OutputTerminal from './OutputTerminal';
import PoseComponent from '../../../engine/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/components/RenderingComponent';
import ShapeComponent from '../../../engine/components/ShapeComponent';
import WireCreationCaret from '../tools/carets/WireCreationCaret';

@EntityHas(MouseEventComponent)
export default class Wire extends Entity {

    constructor({ head, tail }: { head: InputTerminal | WireCreationCaret, tail: OutputTerminal | WireCreationCaret }) {
        super();
        this.add(PoseComponent, { x: - Infinity, y: -Infinity });
        this.add(ShapeComponent, new Rectangle({ width: -Infinity, height: -Infinity }));
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(LineComponent, { head: head.id, tail: tail.id });
    }

    public get head(): IEntity {
        return this._store.entities.find(this.get(LineComponent).data.head)!;
    }

    public get tail(): IEntity {
        return this._store.entities.find(this.get(LineComponent).data.tail)!;
    }

}
