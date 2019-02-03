import CursorEventComponent from '../../engine/components/CursorEventComponent';
import Entity from '../../engine/abstracts/Entity';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import PoseComponent from '../../engine/components/PoseComponent';
import TranslationComponent from '../components/TranslationComponent';

export default abstract class ToolCaret extends Entity {

    constructor(position: IPosition2D) {
        super();
        this.add(CursorEventComponent);
        this.add(PoseComponent, position);
        this.add(TranslationComponent).mutate({ previous: { cursor: position } });
    }

}
