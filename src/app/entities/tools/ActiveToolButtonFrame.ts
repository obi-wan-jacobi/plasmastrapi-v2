import Entity from '../../../engine/abstracts/Entity';
import { HTML5_COLOUR } from '../../../html5/enums/HTML5_COLOUR';
import PoseComponent from '../../../engine/components/PoseComponent';
import Rectangle from '../../../geometry/concretes/Rectangle';
import RenderingComponent from '../../../engine/components/RenderingComponent';
import ShapeComponent from '../../../engine/components/ShapeComponent';
import ToolButton from '../../abstracts/ToolButton';

export default class ActiveToolButtonFrame extends Entity {

    constructor(toolButton: ToolButton) {
        super();
        this.add(PoseComponent, toolButton.get(PoseComponent).data);
        this.add(RenderingComponent, { colour: HTML5_COLOUR.WHITE });
        this.add(ShapeComponent, new Rectangle({ width: 50, height: 50 }));
    }

}
