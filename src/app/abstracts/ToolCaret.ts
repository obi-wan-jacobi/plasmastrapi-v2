import CursorEventComponent from '../../engine/concretes/components/CursorEventComponent';
import Entity from '../../engine/abstracts/Entity';
import IPosition2D from '../../geometry/interfaces/IPosition2D';
import PoseComponent from '../../engine/concretes/components/PoseComponent';
import TranslationComponent from '../../engine/concretes/components/TranslationComponent';

export default abstract class ToolCaret extends Entity {

    constructor(position: IPosition2D) {
        super();
        this.add(CursorEventComponent);
        this.add(PoseComponent, position);
        this.add(TranslationComponent).set({ previous: { cursor: position } });
    }

}
